import React, { Component } from 'react'
import List from '../List/List'
const CatagoryPage = (props) => {
    return (
        <Catagory {...props}/>
    )
}

class Catagory extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentCatagory: null,
      currentTitle: '',
      modalType: null,
      loaded: false,
      data: this.props.data.songs
    };
  }

  
  componentDidMount() {
    
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <section className="main-content columns is-fullheight ">
        <aside className="menu column section is-3 ">
          <p className="menu-label">
            Catagories
          </p>
          <button className={'button is-primary'} onClick={this.createModal}>New Catagory</button>
          <ul className="menu-list">
            {this.state.loaded ? this.renderList() : null}
            {this.state.showModal? this.renderModal(this.state.modalType): null}
          </ul>
          <div><br/></div>
        </aside>
        <div className='column is-8'>
          {this.state.currentCatagory !== null ? <List {...this.props} catagoryId={this.state.currentCatagory} /> : <div></div>}
        </div>
      </section>
    )
  }

  renderList = () => {
    const { data } = this.state;
    
    if(data !== null ){
    return (
      Object.keys(data).map((key, i) => {
        return (
          <div className='level'key={i}>
            <li className='is-info button'id= {key} onClick={() => this.setCatagory(key)}>
              {data[key].Key}  
            </li>
            <button className="delete" onClick={() => this.deleteOne(key)}></button>
          </div>
        )
      })
    );
    }else  return (<li>You have no catagories.</li>) 
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
          </div>
          <button className={'button is-primary'} onClick={modalType}>Save</button>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={this.closeModal}></button>
      </div>
      );
    };

  setCatagory = (key) => {
    
    this.setState({currentCatagory: key},this.forceUpdate())
  }
  createModal = () =>{
    
    this.setState({
      ...this.state,
      modalType: this.createOne,
      showModal: true,
      currentTitle: "",
    })
  }

  closeModal = () => {
    this.setState({...this.state, showModal: false})
  }

  createOne = () => {
    
  };

  deleteOne = (key) => {
    
  };

}

export default CatagoryPage;