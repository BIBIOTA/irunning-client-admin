<template>
  <q-page>
    <Title />
    <div class="q-pa-md items-start q-gutter-md">
      <q-card flat bordered class="my-card">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="form.title"
            label="標題"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-file
            outlined
            v-model="file"
            @update:model-value="updateFiles"
            label="Outlined"
          />

          <q-toggle v-model="form.isIncludeLink" label="是否設定連結(否/是)" />

          <q-input
            filled
            v-model="form.link"
            label="連結"
            lazy-rules
            v-if="form.isIncludeLink === true"
            :rules="[ val => val && regexUrl(val) || 'Url is not valid']"
          />

          <q-toggle v-model="form.isActive" label="是否上架(否/是)" />

          <div class="flex justify-end q-mr-lg q-mb-md">
            <q-btn label="Submit" type="submit" color="primary" :disable="this.form.image === ''" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import { useMutation } from "@vue/apollo-composable";
import { image } from 'src/libs/image.js';
import gql from 'graphql-tag';
import Title from 'src/components/Title.vue';

const createBannerGql = gql`mutation createBanner(
  $title: String!
  $image: String!
  $isIncludeLink: Boolean!
  $link: String
  $isActive: Boolean!
) {
  createBanner(
    title: $title
    image: $image
    isIncludeLink: $isIncludeLink
    link: $link
    isActive: $isActive
  ) {
    id
    title
    image
    isIncludeLink
    link
    isActive
    created_at
    updated_at
  }
}`;

export default defineComponent({
  name: 'BannerCreate',

  components: {
    Title,
  },

  setup () {

    const { mutate: createBanner } = useMutation(createBannerGql, () => ({
      variables: {
        title: form.title,
        image: form.image,
        isIncludeLink: form.isIncludeLink,
        link: form.link,
        isActive: form.isActive,
      },
    }));

    const form = reactive({
      title: '',
      image: '',
      isIncludeLink: false,
      link: '',
      isActive: false,
    });

    const file = ref(null);

    return {
      form,
      file,
      getApi: ref(true),
      createBanner
    }
  },
  methods: {

    regexUrl (value) {
      const regex = new RegExp('^https?://');
      return value.match(regex);
    },

    onSubmit () {

      this.createBanner().then((res) => {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        });
        this.$router.back();
      }).catch((err) => {
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'error',
          message: 'Failed'
        });
      });
    },

    onReset () {
      this.form.title = '';
      this.form.image = '';
      this.form.isIncludeLink = false;
      this.form.link = '';
      this.form.isActive = false;
    },

    updateFiles(file) {
      image.uploadImage({
        image: file,
        path: 'banner'
      }).then((res) => {
        this.form.image = res.image;
      }).catch((err) => {
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'error',
          message: 'Failed'
        });
      });
    },
  },
})
</script>
