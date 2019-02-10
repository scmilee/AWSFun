import React, { Component } from 'react'



const ListPage = (props) => {
    return (
        <List {...props}/>
    )
}

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      catagoryId: this.props.catagoryId,
      currentId: '',
      currentTitle: '',
      currentBody: '',
      showModal: false,
      modalType: null,
      loaded: false
    };
  }

  componentWillReceiveProps(props) {

  }
  componentDidMount() {
   
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidUpdate() {
   // this.forceUpdate();
  }

  render() {
    return (
      <div>
        <button className={'button is-primary'} onClick={this.createModal}>Create New</button>
        <div><br/></div>
        {this.state.loaded ? this.renderList() : null}
        {this.state.showModal? this.renderModal(this.state.modalType): null}
      </div>
    )
  }

  renderList = () => {
    const { data } = this.state;
    let hasFiles = false

    if(data!== null ){
    return (
      <div>
        {Object.keys(data).map((key, i) => {

          if(data[key].files !== undefined){hasFiles = true};
          return (
            <article key={i} className="message is-dark">
              <div className="message-header">
                {data[key].title}
                <button className="delete" onClick={() => this.deleteOne(key)}></button>
              </div>
              <div className="message-body">
                  {data[key].body + '\n'}
                <div className='level is-pulled-right'>
                { hasFiles ? 
                  Object.keys(data[key].files).map((fileKey, ind)=> {
                    const filePath = data[key].files[fileKey];
                    const pathParts = filePath.split("/");
                    const fileName = pathParts.pop();
                    return (
                        <button key={ind} id={filePath} className={'button is-info is-outlined is-pulled-left'} onClick={(e) => this.fileDownload(e, fileName)}>{fileName}</button>
                    )
                  })
                : ""
                }
                  <div className='file is-link'>
                    <label className='file-label'>
                      <input className='file-input ' type='file' onChange={(e)=> this.fileUpload(e, key)}/>
                      <span className='file-cta'>
                        <span className='file-label is-outlined'>Attach file</span>
                      </span>
                    </label>
                  </div>
                  <button className={'button is-success is-outlined is-pulled-right'} onClick={() => this.updateModal(key)}>Update</button>
                </div>
              </div>
              
            </article>
          )
        })}
      </div>
    );
    }else  return (<div>You have no list items.</div>) 
  };

  renderModal = (modalType) => {
      return (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="field">
            <label className="label has-text-white">Title</label>
              <div className="control">
                <input className="input"
                  name="currentTitle"
                  value={this.state.currentTitle}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Title"
                />
              </div>
              <label className="label has-text-white">Body</label>
              <div className="control">
                <input className="input"
                  name="currentBody"
                  value={this.state.currentBody}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Body"
                />   
              </div>
          </div>
          <button className={'button is-primary'} onClick={modalType}>Save</button>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={this.closeModal}></button>
      </div>
      );
    };

  fileUpload = (event , key) => {
   
  }
  fileDownload= (event, fileName) => {
    const filepath = event.target.id;
    event.preventDefault()
    
    this.rootRef.child(`/${filepath}`).getDownloadURL()
    .then((url) =>{

      let xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.open('GET', url, true);
      xhr.onload = () => {
        const blob = xhr.response;

        let link = document.createElement("a");
        document.body.appendChild(link);
        link.style = "display: none";

        url = window.URL.createObjectURL(blob);
        link.href = url
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url);
      };
      xhr.send()

    }).catch(function(error) {
      console.log(error)
    });
  }

  createModal = () =>{
    
    this.setState({
      ...this.state,
      modalType: this.createOne,
      showModal: true,
      currentTitle: "",
      currentBody: ""
    })
  }

  updateModal = (key) =>{
    const { data } = this.state;

    this.setState({
      ...this.state,
      modalType: this.updateOne,
      currentId: key,
      currentTitle: data[key].title,
      currentBody: data[key].body,
      showModal: true
    })
    
  }

  closeModal = () => {
    this.setState({...this.state, showModal: false})
  }

  createOne = () => {
    
  };

  deleteOne = (key) => {

  };

  updateOne = () => {
    
  };

}

export default ListPage;