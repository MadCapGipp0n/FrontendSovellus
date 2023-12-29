<script>
    import { Memo } from '@components/Memos.js';
    import { get } from 'svelte/store';

    export let kursMemo;
    export let memo_id;
    export let memotxt;
    export let memotime;

    let pvm = new Date(memotime);
    let pvm2 = `${pvm.getDate()}.${pvm.getMonth() + 1}.${pvm.getFullYear()}`;

    let output = kursMemo.replace(/[^a-zäö\s]/gi, "");
    output = output[0].toUpperCase() + output.slice(1);

    function delete_div(e) {
        let del_id = e.target.getAttribute('data');
        let current_list = get(Memo);
        let newlist = [];

        current_list.forEach(note => {
            if(del_id != note.id){
                newlist.push(note);
            }
        });

        Memo.set(newlist);
    }

</script>

<div id="pää_ltk">
    <div id="Päiväys">{pvm2}</div>
    <div id="kurs_valinta">{output} (id {memo_id.slice(0,-1)})</div>
    <button id="poista_Memo" on:click={delete_div}><p data={memo_id.slice(0,-1)}>x</p></button>
    <div id="txt_list_ltk">{memotxt.slice(0,-1)}</div>
</div>


<style>#pää_ltk {
        border-radius: 5px;
        border-width: 2px;
        border-style: solid;
        margin-top: 10px;
        margin-bottom: 10px;
        display: grid;
        grid-template-rows: 20px auto;
        grid-template-columns: 100px auto 20px;
        padding: 5px;
        background-color: rgba(255, 255, 255, 0.377);
    }
    #txt_list_ltk {
        grid-column: 1/4;
        padding-top: 5px;
        word-break: break-all;
    }
    #poista_Memo {
        border: none;
        background: none;
        padding: 0;
        text-align: center;
        vertical-align: middle;
        font-size: 20px;
        cursor: pointer;
    }
    #poista_Memo:hover {
        font-size: 30px;
    }
    #poista_Memo p{
        height: 20px;
        width: 30px;
        margin-top: 0;
        margin-bottom: 0;
        line-height: 10px;
    }
</style>