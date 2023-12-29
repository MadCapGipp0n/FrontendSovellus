
<script>
  import { Kurssit } from '@components/Courses.js';
  import { Memo } from '@components/Memos.js';
  import ListBox from '@components/ListBox.svelte';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  Kurssit.useLocalStorage();
  Memo.useLocalStorage(); 

  let selected;
  let Selected_List = get(Memo);
  let Error_txt;

  Memo.subscribe(value => {
    UpdateList();
  })
  onMount(() => {
    UpdateList();
  });
  function UpdateList() {
    let Full_list = get(Memo);
    let hetkiList = [];

    if(!Array.isArray(Full_list)){
      Full_list = [];
    }

    Full_list.forEach(note => {
      if(selected === 'all' || note.course.name === selected){
        hetkiList.push(note);
      }
    });

    try {
      if(hetkiList.length == 0){
        Error_txt.innerText = 'Ei muistiinpanoja!';
      }else{
        Error_txt.innerHTML = '';
      }
    } catch {}

    Selected_List = hetkiList;
  }
</script>

<label for="Memo_lista">Kurssi: </label>
<select name="Kurssit" id="Memo_lista" bind:value={selected} on:change={UpdateList}>
    <option value="all">Kaikki</option>
    {#if $Kurssit && $Kurssit.length > 0}
      {#each $Kurssit as course}
        <option value={course.name}>{course.name[0].toUpperCase() + course.name.slice(1)}</option>
      {/each}
    {/if}
</select><br>

<p bind:this={Error_txt}></p>

{#each Selected_List as note (note.id)}
  <ListBox kursMemo={note.course.name}, memo_id={note.id}, memotxt={note.text}, memotime={note.timestamp} />
{/each}

<style>
  #Memo_lista {
    text-align: center;
  }
</style>