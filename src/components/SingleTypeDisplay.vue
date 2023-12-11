<script lang="ts">

import { ValueType } from '@/scripts/value_type';
import axios from 'axios';

export default {
    props: ["type_prop"],
    data() {
        return {
            edit_type: new ValueType(),
            changed: false
        }
    },
    mounted() {
        console.log("Mounted with ", this.type_prop)
        this.edit_type.id=this.type_prop.id
        this.edit_type.type_name=this.type_prop.type_name
        this.edit_type.type_unit=this.type_prop.type_unit
    },
    methods: {
        // detect if something actually changed
        update_changed() {
            this.changed = ( (this.type_prop.type_name != this.edit_type.type_name) || 
                             (this.type_prop.type_unit != this.edit_type.type_unit) )
            console.log("Changed is now",this.changed)
        },
        // push changed type to backend and emit "update_type"
        update_type() {
            axios.put("/api/type/" + this.edit_type.id + "/", this.edit_type)
                .then((result) => {
                    console.log(result)
                    this.$emit("update_type")
                })

        }
    },
    emits: ["update_type"]
}
</script>

<template>
<div class="row rounded mt-1 mb-0 p-0 ">
    <input class="col bg-secondary rounded me-1" v-model="edit_type.type_name" v-on:change="update_changed" />
    <input class="col bg-secondary rounded" v-model="edit_type.type_unit" v-on:change="update_changed"/>
    <!-- submit button is only visible if something actually changed -->
    <button class="col bg-primary text-end rounded mb-1" v-if="changed" v-on:click="update_type()">submit </button>
</div>

</template>