import React, { Component } from 'react';
import logo from './logo.svg';
import './reset.css';
import './App.css';

import axios from 'axios';
import { getUserInfo } from './service.js';



class App extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      userID: '',
      userAccountID: '',
      profilePic: '',
      userMasteries: [],
      userRunes: [],
      userSoloRank: '',
      userFlexRank: '',
      recentChampOne: '',
      recentChampTwo: '',
      recentChampThree: ''
    }
  }

  updateUserName(userInput) {
    this.setState({
      userName: userInput
    })
  }

  clickHandler() {
    var userMasteries = [];
    var userRunes = [];

    this.setState({
      userFlexRank: '',
      userSoloRank: ''
    })

    axios.get('/getUserInfo/' + this.state.userName).then((response) => {
      console.log(response);
      this.setState({
        userName: response.data.name,
        userID: response.data.id,
        userAccountID: response.data.accountId,
        profilePic: 'http://avatar.leagueoflegends.com/na/' + this.state.userName + '.png'
      })

      axios.get('/getUserMasteries/' + this.state.userID).then((response) => {
        for (let key in response.data.pages) {
          userMasteries.push(response.data.pages[key].name)
        }
        this.setState({
          userMasteries: userMasteries
        })
      });

      axios.get('/getUserRunes/' + this.state.userID).then((response) => {
        for (let key in response.data.pages) {
          userRunes.push(response.data.pages[key].name)
        }
        this.setState({
          userRunes: userRunes
        });
      });

      axios.get('/getUserRank/' + this.state.userID).then((response) => {
        console.log(response.data);
        this.setState({
          userFlexRank: 'Unranked',
          userSoloRank: 'Unranked'
        })
        var rank = response.data;
        for (let i = 0; i < rank.length; i++) {
          if (rank[i]) {
            if ((rank[i].queue).includes('FLEX')) {
              this.setState({
                userFlexRank: response.data[i].tier
              })
            }
            if ((rank[i].queue).includes('SOLO')) {
              this.setState({
                userSoloRank: response.data[i].tier
              })
            }
          }
        }
      });
      axios.get('/getUserMatches/' + this.state.userAccountID).then((response) => {
        console.log(response.data);
          var champOne = response.data.matches[0].champion;
          var champTwo = response.data.matches[1].champion;
          var champThree = response.data.matches[2].champion;
        console.log(champOne);
        axios.get('/getChampIcon/' + champOne).then((response) => {
          console.log(response.data.image.full);
          this.setState({
            recentChampOne: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + response.data.image.full
          })
        });

        axios.get('/getChampIcon/' + champTwo).then((response) => {
          console.log(response.data.image.full);
          this.setState({
            recentChampTwo: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + response.data.image.full
          })
        });

        axios.get('/getChampIcon/' + champThree).then((response) => {
          console.log(response.data.image.full);
          this.setState({
            recentChampThree: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + response.data.image.full
          })
        });
      });
    });
  }

  render() {

    let userRunes = this.state.userRunes.map((runeName, i, a) => {
      return (
        <div key={i}>
          {runeName}
        </div>
      )
    });

    let userMasteries = this.state.userMasteries.map((masteryName, i, a) => {
      return (
        <div key={i}>
          {masteryName}
        </div>
      )
    });

    return (
      <div className="container">
        <img className="background_image" alt='' />
        <h1 className='title'>noDBproject</h1>
        <section className='search_box'>
          <input onChange={(typing) => this.updateUserName(typing.target.value)} placeholder="Search.." />
          <button onClick={() => this.clickHandler()}>Go</button>
        </section>
        <section className="player_rank">
          <div className='top_ranks'>
            <h1>Solo Q Rank:</h1>
            <h1>{this.state.userSoloRank}</h1>
          </div>
          <div className='top_middle'>
            <img src={this.state.profilePic} />
          </div>
          <div className='top_ranks'>
            <h1>Flex Q Rank:</h1>
            <h1>{this.state.userFlexRank}</h1>
          </div>
        </section>

        <section className='player_pages'>
          <div className='player_masteries'>
            <h1>Mastery Pages:</h1><br />
            <h2>{userMasteries}</h2>
          </div>
          <div className='top_champs'>
            <h1>Recently Played:</h1><br />
            <img src={this.state.recentChampOne} alt='' />
            <img src={this.state.recentChampTwo} alt='' />
            <img src={this.state.recentChampThree} alt='' />
          </div>
          <div className='player_runes'>
            <h1>Rune Pages:</h1><br />
            <h2>{userRunes}</h2>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
