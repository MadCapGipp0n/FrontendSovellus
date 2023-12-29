<script>
    export let href;
    export let text;
</script>

<a href={href} class="box">
    {text}
</a>


<style>
    .box {
        display: inline-block;
        border: 1px solid black;
        border-radius: 5px;
        padding: 10px;
        text-decoration: none;
        color: #f1f1f1;
        background-color: #444444;
    }
    .box:hover {
        background-color: rgb(136, 136, 136);
    }
</style>