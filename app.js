// import necesary libs.
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'


let SearchBox = styled.input `
  border-radius: 20px;
  background-color: #000;
  color: #fff;
  font-size: 1.2rem;
  border: 0px;
  height: 40px;
  outline: none;
  padding: 0 10px;
`
let Navigation = styled.header `
  display: flex;
  padding: 0px 10%;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 25px rgba(0,0,0,0.16);
  height: 100px;
`

let NewsContainer = styled.main`
  background-color: #e7d6c8;
  padding: 20px 10%;
`

let NewsItem = styled.div`
  background-color: #fff;
  border: 2px solid #E5E9F2;
  min-height: 150px;
  margin: 20px 0px;
  border-radius: 4px;
  display: flex;
  padding: 10px;
`

let NewsText = styled.div`
  padding-left: 14px;
  position: relative;
`

let DateTime = styled.time`
  position: absolute;
  bottom: 0px;
  color: #399DF2;
  font-family: sans-serif;
`
let Voter=styled.div`
display: flex;
flex-direction: column;
justify-content: center;
text-align: center;
margin:10px;

`

  
 
class News extends Component{
  
  constructor(){
    super()
  
    this.state = {
      news: [],
      searchValue: '',clicks: 0
    }

    this.getNews()

  }

  getNews(searchTerm = 'Iraq') {
    fetch(`https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=978d6c3818ff431b8c210ae86550fb1f`)
    .then((response)=>{
      return response.json()
    })
    .then((data)=>{
      this.setState({
        news: data.articles
      })
    })
  }
  handleClick() {
    this.setState((prevState) => ({
         clicks: prevState.clicks + 1
      }));
  }
  handleClick2() {
   this.setState((prevState) => ({
         clicks: prevState.clicks - 1
      }));
  }
 
  onInputChange(event){
    this.setState({
      searchValue: event.target.value
    })
  } 

  onKeyUp(event){
    if(event.key == 'Enter'){
      this.getNews(this.state.searchValue)
      this.setState({
        searchValue: ''
      })
    }
  }
  


  render() {
   var counter=1
    return (
      <React.Fragment>
        <Navigation>
          <img width="150px;" src={require('./assets/logo.svg')}/>
          <SearchBox 
          onChange={this.onInputChange.bind(this)} 
          onKeyUp={this.onKeyUp.bind(this)}
          value={this.state.searchValue} placeholder="search term"/>
        </Navigation>
        <NewsContainer>
          {
            this.state.news.map((item, i)=>{
              return (
              <NewsItem key={i}>
                  <img width="124px;" height="124px" src={item.urlToImage} />
                <NewsText>
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                  <DateTime>{item.publishedAt}</DateTime>
                </NewsText>
                
     <Voter key={i}>
       <img id="UpVote"  height="13px" src={require('./assets/upvote.svg')} alt="" onClick={this.handleClick.bind(this)}/>
       {this.state.clicks}
       <img  id="DownVote" height="13px" src={require('./assets/downvote.svg')} alt=""onClick={this.handleClick2.bind(this)}/>
     </Voter>
              </NewsItem>
              )
            })
          }
        </NewsContainer>
      </React.Fragment>
    )
  }
}

function App() {
  return <div>
    <News/>
    
  </div>
}

ReactDOM.render(<App/>, document.getElementById('root'))
