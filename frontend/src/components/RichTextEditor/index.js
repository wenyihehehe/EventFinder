import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import style from './index.module.css';

class RichTextEditor extends Component {
	constructor(props) {
		super(props);
		this.modules = {
			toolbar: [
                'bold', 'italic', 'underline', 
                'code-block',{ 'header': 1 }, { 'header': 2 },
                'blockquote',{'list': 'ordered'}, {'list': 'bullet'},'clean'
		    ]
		};
		this.formats = [
		    'bold', 'italic', 'underline',
            'code-block','header','blockquote',
		    'list', 'bullet',
	  	];
		this.rteChange = this.rteChange.bind(this);
	}

	rteChange = (content, delta, source, editor) => {
        this.props.handleEvent(content);
	}

	render() {
	    return (
	      <div className={`${style.richTextEditor}`}>
	        <ReactQuill theme="snow"  modules={this.modules}
				formats={this.formats} onChange={this.rteChange}
			    value={this.props.value}/>
	      </div>
	    );
	}
}

export default RichTextEditor;