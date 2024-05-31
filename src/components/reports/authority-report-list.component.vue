<script>
import Button from "primevue/button";
import Card from "primevue/card";
import OrderList  from "primevue/orderlist";
import DataView from "primevue/dataview";
export default {
  name: "municipality",
  components: {
    Card,
    Button,
    DataView,
    OrderList
  },
}
</script>

<template>
  <div class="flex justify-content-center flex-wrap">
    <h1>Reports List</h1>
  </div>
    <Card class="cardpe">
      <template #content>
        <div class="flex flex-wrap gap-1 md:gap-4 xl:gap-8 ">
            <OrderList class="w-full" v-model="elementos" list-style-type="decimal">
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
      </template>
    </Card>

</template>

<style scoped>

</style>