<template>
  <div class="q-pa-md">
    <q-list bordered>
      <q-item v-if="columns">
        <q-item-section center v-for="col in columns" :key="col.name">
          <q-item-label :class="col.name === 'edit' ? 'text-center' : 'text-left'">
            <span class="text-weight-medium">{{col.label}}</span>
          </q-item-label>
        </q-item-section>
      </q-item>
      <template v-if="initialGetApi && rows.length > 0">
        <q-item v-for="(row, i) in rows" :key="`row_${i}`">
          <q-item-section center v-for="(column, key) in row" :key="key" v-show="key !== 'id'">

            <q-item-label v-if="key === 'isActive'">
              <q-toggle
                v-model="row.isActive"
                color="primary"
                @click="$emit('update', row)"
              />
            </q-item-label>

            <q-item-label v-else-if="key === 'customBtns'"  class="text-center">
              <div class="text-grey-8 q-gutter-xs">
                <q-btn
                  v-if="row.customBtns.view"
                  class="gt-xs"
                  size="12px"
                  flat
                  dense
                  round
                  icon="visibility"
                  @click="$emit('customAction', 'clickView', row.customBtns)"
                />
              </div>
            </q-item-label>

            <q-item-label v-else-if="key === 'edit'"  class="text-center">
              <div class="text-grey-8 q-gutter-xs">
                <q-btn
                  v-if="row.edit.remove"
                  @click="confirm = true; selectedId = row.id"
                  class="gt-xs"
                  size="12px"
                  flat
                  dense
                  round
                  icon="delete"
                />
                <q-btn
                  v-if="row.edit.edit"
                  class="gt-xs"
                  size="12px"
                  flat
                  dense
                  round
                  icon="edit"
                  :to="`${$route.path}/edit/${row.edit.id}`"
                />
                <q-btn
                  v-if="row.edit.view"
                  class="gt-xs"
                  size="12px"
                  flat
                  dense
                  round
                  icon="visibility"
                  :to="`${$route.path}/view/${row.edit.id}`"
                />
              </div>
            </q-item-label>

            <q-item-label v-else-if="key === 'image'">
              <img style="max-width: 200px" :src="column" />
            </q-item-label>

            <q-item-label v-else-if="key === 'contentHtml'">
              <span class="text-weight-medium" v-html="column" />
            </q-item-label>

            <q-item-label v-else>
              <span class="text-weight-medium">{{column}}</span>
            </q-item-label>
          </q-item-section>

        </q-item>
      </template>
    </q-list>
    <q-dialog v-model="confirm" persistent>
      <q-card style="min-width: 300px">
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="red" text-color="white" />
          <span class="q-ml-sm">確定要刪除資料嗎 ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn @click="selectedId = null" flat label="取消" color="primary" v-close-popup />
          <q-btn @click="onDelete" flat label="確定" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  name: 'List',

  props: {
    initialColumns: Array,
    initialRows: Array,
    initialGetApi: Boolean,
  },

  data () {
    return {
      columns: reactive(this.initialColumns ?? []),
      rows: reactive(this.initialRows ?? []),
      confirm: ref(false),
      selectedId: ref(null),
    }
  },

  watch: {
    initialColumns(newVal) {
      this.columns = newVal;
    },
    initialRows(newVal) {
      this.rows = newVal;
    }
  },

  methods: {
    onDelete() {
      this.$emit('delete', this.selectedId);
      this.selectedId = null;
    },
  },
  created() {}
})
</script>