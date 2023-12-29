<script>
    import Linkbox from '@components/linkbox.svelte';
    import { Kurssit } from '@components/Courses.js';
    import { Memo } from '@components/Memos.js';
    

    Kurssit.useLocalStorage();
    Memo.useLocalStorage();
</script>

  

{#if $Kurssit && $Kurssit.length > 0}
    <Linkbox href="/Luo" text="Luo Memo Kurssista" />
{/if}

<Linkbox href="/list" text="Listaa Memot" />
<Linkbox href="/add" text="Lisää kurssi" />