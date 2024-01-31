<script lang="ts">
import { Value } from '@/scripts/value'
import axios from 'axios'

export default {
    props: ['value', 'value_types'],
    data() {
        return {
            edit_value: new Value(),
            edit_mode: false
        }
    },
    mounted() {
        this.edit_value.value_id=this.value.value_id
        this.edit_value.comment=this.value.comment
        this.edit_value.time=this.value.time
        this.edit_value.value=this.value.value
        this.edit_value.value_type_id=this.value.value_type_id
    },
    emits: ['update_comment'],
    methods: {
        get_type_name(value: Value) : string {
          for (var i = 0; i < this.value_types.length; i++) {
            if (this.value_types[i].value_type_id == value.value_type_id) {
              return this.value_types[i].type_name
            }
          }
          return 'XXX'
        },
        get_unit(value: Value): string {
          for (var i = 0; i < this.value_types.length; i++) {
            if (this.value_types[i].value_type_id == value.value_type_id) {
              return this.value_types[i].type_unit
            }
          }
          return 'XXX'
        },
        update_comment(){
            this.edit_mode=false
            axios.put("/api/value/"+this.edit_value.value_id+"/", this.edit_value)
                .then((result) => {
                    console.log(result)
                    this.$emit("update_comment")
                })
        }
    }
}
</script>

<template>
    <div class="row bg-secondary rounded mt-1">
        <div class="col-1">
            {{ value.time }}
        </div>
        <div class="col-1">
            {{ get_type_name(value) }}
        </div>
        <div class="col">
            {{ value.value.toFixed(2) }} {{ get_unit(value) }}
        </div>
        <div class="col" v-if="!edit_mode" v-on:click="edit_mode=true">
            {{ value.comment }}
        </div>
        <div class="col" v-if="edit_mode">
            <div class="row">
                <input class="col bg-secondary rounded me-1" v-model="edit_value.comment">
                <button class="col-1 bg-primary text-end rounded mb-1 button" v-on:click="update_comment()">submit</button>"
            </div>
        </div>
    </div>
</template>