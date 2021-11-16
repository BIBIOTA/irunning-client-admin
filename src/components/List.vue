<template>
  <div class="q-pa-md">
    <q-list bordered>
      <q-item>
        <q-item-section center v-for="col in columns" :key="col.name">
          <q-item-label :class="col.name === 'edit' ? 'text-center' : 'text-left'">
            <span class="text-weight-medium">{{col.label}}</span>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-for="(row, i) in rows" :key="`row_${i}`">
        <q-item-section center v-for="(column, key) in row" :key="key">

          <q-item-label v-if="key === 'isActive'">
            <q-toggle
              v-model="row.isActive"
              color="primary"
            />
          </q-item-label>

          <q-item-label v-else-if="key === 'edit'"  class="text-center">
            <div class="text-grey-8 q-gutter-xs">
              <q-btn v-if="row.edit.remove" class="gt-xs" size="12px" flat dense round icon="delete" />
              <q-btn v-if="row.edit.edit" class="gt-xs" size="12px" flat dense round icon="edit" />
            </div>
          </q-item-label>

          <q-item-label v-else>
            <span class="text-weight-medium">{{column}}</span>
          </q-item-label>
        </q-item-section>

      </q-item>
    </q-list>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'List',

  props: {
    initialColumns: Array,
    initialRows: Array
  },

  data() {
    return {
      columns: this.initialColumns,
      rows: this.initialRows,
    }
  },
  methods: {},
  created() {}
})
</script>