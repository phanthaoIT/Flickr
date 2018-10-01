import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const api_key = 'aaae15617266491a38519f52be4443c2'

class App extends Component {
  constructor() {
    super();
    this.state = {
        images:[],
        page:1,
        max:1,
    }
}
  componentDidMount() {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${api_key}&extras=+owner_name%2Cviews%2Curl_z&per_page=20&page=1&format=json&nojsoncallback=1`)    
    .then(res=>{
      const img= res.data.photos.photo
      this.setState({
        images:img,
        page:res.data.photos.page +1,
        max:res.data.photos.pages
      })
    })
  }
  loadData = () => {
    if (this.state.page > this.state.max) return;
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${api_key}&extras=+owner_name%2Cviews%2Curl_z&per_page=20&page=${this.state.page}&format=json&nojsoncallback=1`)    
    .then(res=>{
      const img= res.data.photos.photo
      this.setState({
        images:this.state.images.concat(img),
        page:this.state.page + 1
      })
    })
  };
  render() {
    return (
      <div>
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Flickr</a>
        </div>
      <InfiniteScroll
          dataLength={this.state.images.length}
          next={this.loadData}
          hasMore={true}>
           <div id="mygallery">
            {this.state.images.map(image => (
              <div className="box">
                <div className="imgBox"> 
                  <img alt={image.title} src={image.url_z} style={{height:250}}/>
                </div>
                <div className="content">
                  <p>{image.title}</p><br></br>
                  <p>by {image.ownername}</p>
                  <p>views: {image.views}</p>
                </div>
              </div>
            ))}
          </div>
      </InfiniteScroll></div>
    );
  }
}
export default App;
