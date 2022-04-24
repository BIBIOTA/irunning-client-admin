<template>
  <q-page>
    <Title />
    <div class="q-pa-md items-start q-gutter-md" v-if="getApi">
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

          <q-editor
            v-model="form.content"
            ref="editorRef"
            @paste="onPaste"
            min-height="5rem"
            placeholder="內容"
            :toolbar="[
              [
                {
                  label: $q.lang.editor.align,
                  icon: $q.iconSet.editor.align,
                  fixedLabel: true,
                  list: 'only-icons',
                  options: ['left', 'center', 'right', 'justify']
                },
                {
                  label: $q.lang.editor.align,
                  icon: $q.iconSet.editor.align,
                  fixedLabel: true,
                  options: ['left', 'center', 'right', 'justify']
                }
              ],
              ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
              ['token', 'hr', 'link', 'custom_btn'],
              [
                {
                  label: $q.lang.editor.formatting,
                  icon: $q.iconSet.editor.formatting,
                  list: 'no-icons',
                  options: [
                    'p',
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'code'
                  ]
                },
                {
                  label: $q.lang.editor.fontSize,
                  icon: $q.iconSet.editor.fontSize,
                  fixedLabel: true,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'size-1',
                    'size-2',
                    'size-3',
                    'size-4',
                    'size-5',
                    'size-6',
                    'size-7'
                  ]
                },
                {
                  label: $q.lang.editor.defaultFont,
                  icon: $q.iconSet.editor.font,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'default_font',
                    'arial',
                    'arial_black',
                    'comic_sans',
                    'courier_new',
                    'impact',
                    'lucida_grande',
                    'times_new_roman',
                    'verdana'
                  ]
                },
                'removeFormat'
              ],
              ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

              ['undo', 'redo'],
              ['viewsource']
            ]"
            :fonts="{
              arial: 'Arial',
              arial_black: 'Arial Black',
              comic_sans: 'Comic Sans MS',
              courier_new: 'Courier New',
              impact: 'Impact',
              lucida_grande: 'Lucida Grande',
              times_new_roman: 'Times New Roman',
              verdana: 'Verdana'
            }"
          />

          <q-toggle v-model="form.isActive" label="是否上架(否/是)" />

          <div class="flex justify-end q-mr-lg q-mb-md">
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import { useRoute } from 'vue-router'
import { useQuery, useMutation } from "@vue/apollo-composable";
import gql from 'graphql-tag';
import Title from 'src/components/Title.vue';

const newsGql = gql`query news(
  $id: ID!
) {
  news(
    id: $id
  ) {
    id
    title
    content
    isActive
    created_at
    updated_at
  }
}`;

const updateNewsGql = gql`mutation updateNews(
  $id: ID!
  $title: String!
  $content: String
  $isActive: Boolean!
) {
  updateNews(
    id: $id
    title: $title
    content: $content
    isActive: $isActive
  ) {
    id
    title
    content
    isActive
    created_at
    updated_at
  }
}`;

export default defineComponent({
  name: 'NewsEdit',

  components: {
    Title,
  },

  setup () {

    const route = useRoute();

    const id = route.params.id;

    const { result, refetch } = useQuery(newsGql, { id });

    const { mutate: updateNews } = useMutation(updateNewsGql);

    const form = reactive({
      id: null,
      title: '',
      content: '',
      isActive: false,
    });

    const editorRef = ref(null);

    return {
      form,
      refetch,
      result,
      editorRef,
      getApi: ref(false),
      updateNews,
    }
  },
  methods: {
    onSubmit () {

      this.updateNews(this.form).then((res) => {
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
      this.form.title = ''
      this.form.content = ''
      this.form.isActive = false
    },

    onPaste (evt) {
      // Let inputs do their thing, so we don't break pasting of links.
      if (evt.target.nodeName === 'INPUT') return
      let text, onPasteStripFormattingIEPaste
      evt.preventDefault()
      evt.stopPropagation()
      if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
        text = evt.originalEvent.clipboardData.getData('text/plain')
        this.editorRef.runCmd('insertText', text)
      }
      else if (evt.clipboardData && evt.clipboardData.getData) {
        text = evt.clipboardData.getData('text/plain')
        this.editorRef.runCmd('insertText', text)
      }
      else if (window.clipboardData && window.clipboardData.getData) {
        if (!onPasteStripFormattingIEPaste) {
          onPasteStripFormattingIEPaste = true
          this.editorRef.runCmd('ms-pasteTextOnly', text)
        }
        onPasteStripFormattingIEPaste = false
      }
    },
    async initApi() {
      await this.refetch();
      const res = await this.result;
      this.form = reactive({
        id: res.news.id,
        title: res.news.title,
        content: res.news.content,
        isActive: res.news.isActive,
      });
      this.getApi = true;
    },
  },
  mounted() {
    this.initApi();
  }
})
</script>
