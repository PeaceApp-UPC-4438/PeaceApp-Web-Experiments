<script>
import Button from "primevue/button";
import Card from "primevue/card";
import DataView from "primevue/dataview";
import OrderList  from "primevue/orderlist";

export default {
  name: "report-list",
  components: {
    Card,
    Button,
    DataView,
    OrderList
  },
  data() {
    return {
      elementos: [
        {label: 'Elemento 1'},
        {label: 'Elemento 2'},
        {label: 'Elemento 3'}
      ],
      reports: [
        {number:"1", kind: "Asalto", distict: "La victoria"},
        {number:"2", kind: "Robo", distict: "San Miguel"},
        {number:"3", kind: "Asalto", distict: "Breña"},
      ]
    };
  },
  methods: {
    agregarElemento() {
      const nuevoElemento = { label: `Elemento ${this.elementos.length + 1}` };
      this.elementos.push(nuevoElemento);
    },
  }
}

 </script>

<template>
  <div class="container">
    <h1>Reports</h1>
    <Card class="cardpe">
      <template #title>
        Reports List
      </template>
      <template #content>
        <div class="flex flex-wrap gap-1 md:gap-4 xl:gap-8 ">
          <!--<div class="flex-initial flex align-items-center justify-content-center">
            <Button label="New Report" @click="agregarElemento" />
          </div>-->
          <router-link to="/user/create-report-form">
            <Button label="New Report" />
          </router-link>
          <div class="flex-initial flex align-items-center justify-content-center">
            <OrderList class="text" v-model="elementos" list-style-type="decimal">
              <template #item="reports">
                <div class="flex-1 flex flex-column gap-2">
                  <span class="font-bold">{{ reports.item.number }}</span>
                  <div class="flex align-items-center gap-2">
                    <span>{{reports.item.kind }}</span>
                  </div>
                </div>
              </template>
            </OrderList>
          </div>

        </div>
      </template>

    </Card>
  </div>
</template>

<style scoped>
  .container {
    padding: 20vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .cardpe{
    width:70vw;
  }
  .text{
    width: 50vw;
  }

</style>






