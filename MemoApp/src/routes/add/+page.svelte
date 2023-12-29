<script>
    import { Kurssit } from '@components/Courses.js';
    import { Memo } from '@components/Memos.js';
    import ListBoxSimple from '@components/ListBoxSimple.svelte';
    import { writable } from 'svelte/store';
    import { get } from 'svelte/store';

    Kurssit.useLocalStorage();
    Memo.useLocalStorage();


    const tehtyKurssi = writable([]);

    let input_text;

    function AddToList() {

        if(!input_text.replace(/\s+/g, '') ?? ''){
            return
        }

        const tehtyKurs = get(Kurssit);

        let max = 0;

        for(let i = 0; i < tehtyKurs.length; i++) {
            if(tehtyKurs[i].id > max) max = tehtyKurs[i].id;
            if(tehtyKurs[i].name == input_text) return;
        }

        const uusiKurs = {
            id: max+1,name: input_text
        }

        if(tehtyKurs.length > 0){
            Kurssit.set(tehtyKurs.concat(uusiKurs));
        }else{
            Kurssit.set([uusiKurs]);
        }
        
        tehtyKurssi.update(list => [...list, uusiKurs]);
    }

</script>


<p>Add Kurssit</p>
<textarea type="text" id="Opintojakso" bind:value={input_text}/><br>
<button on:click={AddToList}>Tallennas</button>

{#each $tehtyKurssi as course}
    <ListBoxSimple memotxt={`Opintojakso ${course.name} lisätty id:llä ${course.id}`}/>
{/each}


<style>
    textarea {
        display: block;
        width: 50%;
        height: 100px;
        margin: 10px 0;
        border-width: 0;
        resize: none;
        font-family: 'open-sans', sans-serif;
        border: none;
        outline: none;
        background-color: rgb(255, 255, 255);
    }

</style>