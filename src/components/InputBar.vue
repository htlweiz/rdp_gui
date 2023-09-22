<script lang="ts">

import { sleep } from '@/scripts/sleep'

class SearchCommand {
    private search_string: string;  //Private member to store the search string
    private typing: boolean;  //Private member to track whether typing is in progress

    constructor(search_string: string, typing: boolean) {
        this.search_string = search_string;  //Initialize search string
        this.typing = typing;  //Initialize typing status
    }

    async execute() {
        if (this.typing) {
            return;  //If typing, do nothing
        }
        this.typing = true;  
        await sleep(1000);  
        console.log("Search update ", this.search_string);  
        this.typing = false;  //Set typing to false after search update
    }
}

export default {
    data() { return {
        search_string: "",  //Data property to store the search string
        typing: false  //Data property to track typing status
    }},
    props: ['the_commands'],  //Receive props named 'the_commands'
    setup(props) {
        console.log(props.the_commands);  
    },
    emits: ['search'],  //Define custom event 'search' that can be emitted
    methods: {
        search_update() {
            const searchCommand = new SearchCommand(this.search_string, this.typing);  //Create a new SearchCommand instance
            searchCommand.execute();  //Execute the search command
        }
    }
}
</script>

<template>
    <div class="row bg-primary mb-2">
      <input class="bg-primary" width="100%"
        id="search_string"
        placeholder="search"
        :onkeydown="search_update"  
        v-model="search_string"/>  
    </div>
</template>
