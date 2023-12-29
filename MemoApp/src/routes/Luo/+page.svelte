<script>
    import { Kurssit } from '@components/Courses.js';
    import { Memo } from '@components/Memos.js';
    import ListBoxSimple from '@components/ListBoxSimple.svelte';
    import { writable } from 'svelte/store';
    import { get } from 'svelte/store';

    Kurssit.useLocalStorage();
    Memo.useLocalStorage();

    let valittuKurs;
    let txt;

    let select_obj;

    const added_list = writable([]); 

    function AddNote() {

        if(!txt.replace(/\s+/g, '') ?? ''){
            return
        }

        select_obj.disabled = true;

        const current_Notes = get(Memo);

        let selected_course = get(Kurssit).find(current_courses => current_courses.name === valittuKurs);

        let max = 0;

        current_Notes.forEach(note => {
            if(note.id > max){
                max = note.id;
            }
        });

        const temp_added_list = get(added_list)

        temp_added_list.forEach(note => {
            if(note.id > max) {
                max = note.id;
            }
        });

        let new_note = {
            id: max+1,
            text: txt,
            course: selected_course,
            timestamp: GetTime()
        };

        added_list.update(list => [...list, new_note]);
        txt = '';
        
    }

    function GetTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hour = String(now.getHours()).padStart(2, '0');
        const minute = String(now.getMinutes()).padStart(2, '0');
        const second = String(now.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }


</script>

<p>Lisää muistiinpanoja kurssiin</p><br>

<label for="kurssiLista">course: </label>
<select name="Kurssit" id="kurssiLista " bind:value={valittuKurs} bind:this={select_obj}>
    {#if $Kurssit && $Kurssit.length > 0}
        {#each $Kurssit as course}
        <option value={course.name}>{course.name[0].toUpperCase() + course.name.slice(1)}</option>
        {/each}    
    {/if}
</select><br>

<textarea name="muistio" id="muistio" bind:value={txt}/>

<button on:click={AddNote}>Lisää</button>


{#each $added_list as note }
    <ListBoxSimple memotxt={note.text}/>
{/each}

<style>
    #kurssiLista{
        text-align: right;
    }
    #muistio {
        display: block;
        width: 40%;
        height: 100px;
        margin: 10px 0;
        border-width: 0;
        resize: none;
        font-family: 'open-sans', sans-serif;
        border: none;
        outline: none;
        background-color: rgb(156, 156, 156);
    }
</style>