<template>
  <b-card :header="caption">
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
      <template slot="status" slot-scope="data">
        <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
      </template>
      <template slot="actions" slot-scope="data">
        <b-badge @click="editFilter(data.item.id)"  class='badge-pill badge-warning badge-action'><i class="icon-pencil"></i></b-badge>
        <b-badge @click="deleteFilter(data.item.id)" class='badge-pill badge-danger badge-action'><i class="icon-trash"></i></b-badge>
      </template>
    </b-table>
    <nav>
      <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
  </b-card>
</template>

<script>
/**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export default {
  name: 'FiltersTable',
  props: {
    caption: {
      type: String,
      default: 'Table'
    },
    hover: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
      return {
        fields: [
            {key: 'id'},
            {key: 'tipo'},
            {key: 'servicio'},
            {key: 'actions'}
        ],
        currentPage: 1,
        perPage: 10,
        totalRows: 0,
      }
  },
  computed: {
        filterList(){
            return this.$store.state.filterList;
        },
        filterTypes(){
            return this.$store.state.filterTypes;
        },
        items(){
            var rowsArray = [];

            for (var i = 0; i < this.filterList.length; i++){
                var holi = {
                    id: this.filterList[i].id,
                    tipo: this.filterList[i].filterType.name,
                    servicio: this.filterList[i].name
                };
                rowsArray.push(holi);
            }

            console.log(rowsArray);
            return rowsArray;
        
        }
    },
  methods: {
    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    getRowCount (items) {
      return items.length
    },
    editFilter(id){
        console.log(id);
    },
    deleteFilter(id){
        console.log(id);
    }
  }
}
</script>

<style>
.badge-action i{
  color:black;
}
.badge-action:hover{
  cursor:pointer;
}
</style>