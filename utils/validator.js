module.exports = {
    // safe string not including javascript code
    isSafeString : function(str) {
        return !str.includes('<script>') && !str.includes('</script>');
    },
    // safe string not including html code
    isSafeHtml : function(str) {
        return !str.includes('<') && !str.includes('>');
    },
}