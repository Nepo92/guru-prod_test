var BlockEmbed = Quill.import('blots/block');

class IFrame extends BlockEmbed {
    static create(value) {
        let node = super.create(value);
        node.innerHTML = value;
        return node;
    }
}
IFrame.blotName = 'iframe';
IFrame.className = 'ql-iframe';
IFrame.tagName = 'div';

Quill.register({
    'formats/iframe': IFrame
});

var icons = Quill.import('ui/icons');
icons['iframe'] = '<i class="fa fa-bold" aria-hidden="true"></i>';


$(document).ready(function(){
    const toolbarOptions = [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'bullet' }],
        [{ 'align': ['', 'center', 'right'] }],
        ['video'],
        ['iframe'],
        ['clean']
    ];
    const $hiddenEditor = $('#editor-hidden');

    var quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: toolbarOptions
        }
    });

    quill.on('text-change', function(delta, oldDelta, source) {
        $hiddenEditor.val(quill.root.innerHTML);
    });
});
