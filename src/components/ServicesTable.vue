<template>
  <b-card :header="caption">
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" responsive="sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
      <template slot="status" slot-scope="data">
        <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
      </template>
      <template slot="actions" slot-scope="data">
        <b-badge  class='badge-pill badge-success badge-action'><i class="fa fa-eye"></i></b-badge>
        <b-badge  class='badge-pill badge-warning badge-action'><i class="icon-pencil"></i></b-badge>
        <b-badge  class='badge-pill badge-danger badge-action'><i class="icon-trash"></i></b-badge>
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
  name: 'ServicesTable',
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
      items: shuffleArray([
        {servicio: 'Samppa Nori', registered: '2012/01/01', filtro: 'Member', status: 'Active'},
        {servicio: 'Estavan Lykos', registered: '2012/02/01', filtro: 'Staff', status: 'Banned'},
        {servicio: 'Chetan Mohamed', registered: '2012/02/01', filtro: 'Admin', status: 'Inactive'},
        {servicio: 'Derick Maximinus', registered: '2012/03/01', filtro: 'Member', status: 'Pending'},
        {servicio: 'Friderik Dávid', registered: '2012/01/21', filtro: 'Staff', status: 'Active'},
        {servicio: 'Yiorgos Avraamu', registered: '2012/01/01', filtro: 'Member', status: 'Active'},
        {servicio: 'Avram Tarasios', registered: '2012/02/01', filtro: 'Staff', status: 'Banned'},
        {servicio: 'Quintin Ed', registered: '2012/02/01', filtro: 'Admin', status: 'Inactive'},
        {servicio: 'Enéas Kwadwo', registered: '2012/03/01', filtro: 'Member', status: 'Pending'},
        {servicio: 'Agapetus Tadeáš', registered: '2012/01/21', filtro: 'Staff', status: 'Active'},
        {servicio: 'Carwyn Fachtna', registered: '2012/01/01', filtro: 'Member', status: 'Active'},
        {servicio: 'Nehemiah Tatius', registered: '2012/02/01', filtro: 'Staff', status: 'Banned'},
        {servicio: 'Ebbe Gemariah', registered: '2012/02/01', filtro: 'Admin', status: 'Inactive'},
        {servicio: 'Eustorgios Amulius', registered: '2012/03/01', filtro: 'Member', status: 'Pending'},
        {servicio: 'Leopold Gáspár', registered: '2012/01/21', filtro: 'Staff', status: 'Active'},
        {servicio: 'Pompeius René', registered: '2012/01/01', filtro: 'Member', status: 'Active'},
        {servicio: 'Paĉjo Jadon', registered: '2012/02/01', filtro: 'Staff', status: 'Banned'},
        {servicio: 'Micheal Mercurius', registered: '2012/02/01', filtro: 'Admin', status: 'Inactive'},
        {servicio: 'Ganesha Dubhghall', registered: '2012/03/01', filtro: 'Member', status: 'Pending'},
        {servicio: 'Hiroto Šimun', registered: '2012/01/21', filtro: 'Staff', status: 'Active'},
        {servicio: 'Vishnu Serghei', registered: '2012/01/01', filtro: 'Member', status: 'Active'},
        {servicio: 'Zbyněk Phoibos', registered: '2012/02/01', filtro: 'Staff', status: 'Banned'},
        {servicio: 'Einar Randall', registered: '2012/02/01', filtro: 'Admin', status: 'Inactive'},
        {servicio: 'Félix Troels', registered: '2012/03/21', filtro: 'Staff', status: 'Active'},
        {servicio: 'Aulus Agmundr', registered: '2012/01/01', filtro: 'Member', status: 'Pending'}
      ]),
      fields: [
        {key: 'servicio'},
        {key: 'unidad'},
        {key: 'tipo'},
        {key: 'sector'},
        {key: 'destinatario'},
        {key: 'actions'}
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: 0
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