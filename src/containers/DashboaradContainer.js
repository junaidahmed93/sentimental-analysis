import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* eslint no-unused-vars: "off" */
import { Doughnut } from 'react-chartjs-2';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ReactWordCloud from 'react-wordcloud';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { XAxis, YAxis, LineChart, Line, Tooltip, Legend, PieChart, Pie, CartesianGrid, Label, BarChart, Bar, Cell } from 'recharts';
import AverageStats from '../components/dashboard/AverageStats';
import * as actions from '../actions/DashboardActions';
import DubaiProfile from '../assets/images/dubaiPro.PNG';
import DubaiTweetName from '../assets/images/tweetName.PNG';


const WORD_COUNT_KEY = 'value';
const WORD_KEY = 'word';

const style = {
  // height: 400,
  width: '98%',
  textAlign: 'center',
  display: 'inline-block',
  margin: '0.5rem 1rem',
  padding: '5px',
  // border: '1px solid orange'
};

const shortSheets1 = {
  width: '40%',
  textAlign: 'center',
  display: 'inline-block',
  margin: '1rem 1rem',
  height: '300px',
};

const shortSheets2 = {
  width: '29%',
  textAlign: 'center',
  display: 'inline-block',
  margin: '1rem 1rem',
  height: '300px',
};

const shortSheets3 = {
  width: '24%',
  textAlign: 'center',
  display: 'block',
  height: '130px',

};
const shortSheets4 = {
  width: '100%',
  textAlign: 'center',
  display: 'block',
  margin: '1rem 1rem',
  height: '70px',
  backgroundColor: '#00A7B3',
};

const shortSheets5 = {
  width: '100%',
  textAlign: 'center',
  display: 'block',
  margin: '1rem 1rem',
  height: '70px',
  backgroundColor: '#0088FE',
};
const shortSheets6 = {
  width: '100%',
  textAlign: 'center',
  display: 'block',
  margin: '1rem 1rem',
  height: '70px',
  backgroundColor: '#007CB9',
};
const shortSheets9 = {
  width: '100%',
  textAlign: 'center',
  display: 'block',
  margin: '1rem 1rem',
  height: '70px',
};


const secondChart = {
  width: '100%',
  textAlign: 'center',
  display: 'block',
  margin: '1rem 1rem',
  height: '300px',
};

const data = [{ name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
{ name: 'Group C', value: 300 }, { name: 'Group D', value: 200 }];

const data2 = [{ name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
{ name: 'Group C', value: 300 }];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

class DashboaradContainer extends Component {
  constructor(props) {
    super(props);
    this.searchedArea = '';
    this.interval = '';
    this.state = {
      tweets: {
        tweetId: 0,
        totalFollowers: 0,
        reTweets: 0,
        postiveCount: 0,
        neutralCount: 0,
        negativeCount: 0,
      },
      words: [],
      value: 'عاشر',
      values: ['عاشر', 'من عاشر القوم اربعين يوما، إما صار منهم أو رحل عنهم', 'من عاشر القوم اربعين يوما، إما صار منهم م', 'مرحباً ، هذا أنا ، أعمل على مشروع جديد لإكمال هذا المجال المعين في الفضاء وتدفق الهواء ثم استمر حتى ينتهي العمل'],
      calcImpact: {},
    };
    this.filtered = [];
    this.words = [
      { word: '1', value: 2 },
      { word: '2', value: 4 },
      { word: '3', value: 2 },
      { word: '4', value: 2 },
      { word: '5', value: 2 },
    ];
  }


  componentDidMount() {
    this.props.actions.getStatus();

  }

  componentWillReceiveProps(nextProps) {
    const filtered = [];
    const tweets = nextProps.status;
    let value = '';
    let values = [];
    console.log('nextProps', nextProps);
    if (nextProps) {
      const usedWords = nextProps.status.mostUseKeywords;

      for (let i = 0; i <= this.words.length; i++) {
        let val = 1;
        if (i === 2) {
          val = 3;
        }
        // filtered.push({word: usedWords[i], value:val})
        console.log('this.words[i].word', this.words);
        if (this.words && this.words[i] && this.words[i].word) {
          if (usedWords && usedWords[i]) {
            this.words[i].word = usedWords[i];
          }
        }

        console.log('filtered', filtered);
      }
      console.log('filtered------', filtered);


      const calcImpact = {
        positiveCount: Math.round((tweets.postiveCount / (tweets.postiveCount + tweets.negativeCount + tweets.neutralCount)) * 100),
        negativeCount: Math.round((tweets.negativeCount / (tweets.postiveCount + tweets.negativeCount + tweets.negativeCount)) * 100),
        neutralCount: Math.round((tweets.neutralCount / (tweets.postiveCount + tweets.negativeCount + tweets.neutralCount)) * 100),

      };
      if (nextProps && nextProps.status && nextProps.status.lastFiveTweets && nextProps.status.lastFiveTweets[0]) {
        values = nextProps.status.lastFiveTweets;
        value = nextProps.status.lastFiveTweets[0]
      }
      this.setState({ tweets: nextProps.status, calcImpact, values, value });
    }
  }


  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getTweetText(text) {
    if (text) {
      console.log('text.lastindexOf(': ')', text.lastIndexOf(':'));
      let t = text.substr(9, text.indexOf('Suggestion@dubaipolice.gov.ae… https://t.co/Q'));
      t = t.substr(0, t.indexOf('Sugges'));
      return text;
    }
  }

  onChange = (object, index, value) => {
    this.setState({
      value,
    });
  };

  render() {
    const { tweets, calcImpact, values, value } = this.state;

    return (
      <div className="dashboardContainer">
        <Paper
          style={{
            width: '100%', height: '50px', backgroundColor: '#F6F7F8', borderBottom: '#F6F7F8',
          }}
          zDepth={0}
        >
          <div style={{
            padding: '15px 0px 0px 10px', fontSize: '25px', fontWeight: '25px', color: 'gray',
          }}
          >
            <span>Sentimental Analysis</span>
            <div />
          </div>

        </Paper>

        <div style={{ display: 'flex' }}>

          <Paper style={shortSheets1} zDepth={0} className="left-graph">
            <div>
              <h2 style={{ color: 'gray' }}>OVERALL</h2>
            </div>
            <hr />
            <Grid>
              <Row>
                <Col md={2}>
                  <img style={{ marginLeft: '40px' }} src={DubaiProfile} />
                </Col>
                <Col md={10}>
                  <img src={DubaiTweetName} />
                  <span > {this.getTweetText(tweets.tweetText)} </span>


                </Col>
              </Row>
            </Grid>
            <Grid class="multiple-tweet">
              <Row>
                <Col md={12}>
                  <SelectField
                    className="SelectField"
                    floatingLabelText="Last Five Tweets"
                    style={{ width: '90%' }}
                    value={value}
                    onChange={this.onChange}
                    underlineDisabledStyle={{ cursor: 'pointer', color: 'red', borderBottom: '1px solid #D3D3D3' }}                  >
                    {values.map(v => <MenuItem value={v} primaryText={v} key={v} />)}
                  </SelectField>
                </Col>
              </Row>
            </Grid>

            <PieChart width={400} height={300} onMouseEnter={this.onPieEnter}>
              <text x={400} y={200} textAnchor="middle" dominantBaseline="middle" />
              <Pie
                className="half-chart"
                data={data2}
                cx={90}
                cy={70}
                startAngle={180}
                endAngle={0}
                innerRadius={30}
                outerRadius={40}
                fill="#8884d8"
                paddingAngle={5}
                label
              >
                {
                  data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                }
              </Pie>
              <Legend verticalAlign="left" height={6} iconType="wye" />
            </PieChart>

          </Paper>
          <Paper style={shortSheets2} zDepth={0} className="center-graph">
            <div>
              <h2 style={{ color: 'gray' }}>Comments</h2>
            </div>
            <hr />

            <PieChart width={400} height={300} onMouseEnter={this.onPieEnter}>
              <Pie
                className="donut-chart"
                data={data}
                cx={120}
                cy={100}
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={5}
                label
              >
                {
                  data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                }
              </Pie>
              <Legend verticalAlign="left" height={6} />
            </PieChart>
          </Paper>
          <div style={shortSheets3}>
            <Paper style={shortSheets9} className={calcImpact.positiveCount < calcImpact.negativeCount ? 'positive-class' : 'negative-class'} zDepth={0} >
              <Grid fluid >
                <Row>
                  <Col md={3}>
                    <svg style={{ width: '60px', height: '60px' }} viewBox="0 0 24 24">
                      <path fill="#FFFF" d="M17.45,15.18L22,7.31V19L22,21H2V3H4V15.54L9.5,6L16,9.78L20.24,2.45L21.97,3.45L16.74,12.5L10.23,8.75L4.31,19H6.57L10.96,11.44L17.45,15.18Z" />
                    </svg>
                  </Col>
                  <Col md={3}>
                    <h1 style={{ margin: '10px 0px 0px 10px', color: 'white', fontWeight: '1.1' }}>{calcImpact.positiveCount < calcImpact.negativeCount ? 'Positive' : 'Negative'}</h1>
                    <h3 style={{ margin: '0px 0px 0px 10px', color: 'white', fontWeight: '1.1' }}>Impact</h3>
                  </Col>
                  <Col md={6}>
                    {/* <h3 style={{ color: '#FFFF', margin: '10px 0px 0px 35px' }}>30.15%</h3> */}

                    <svg style={{ width: '50px', height: '50px', margin: '10px 0px 0px 30px' }} viewBox="0 0 24 24">
                      {calcImpact.positiveCount < calcImpact.negativeCount ? <path fill="#FFFF" d="M15,20H9V12H4.16L12,4.16L19.84,12H15V20Z" /> : <path fill="#FFFF" d="M9,4H15V12H19.84L12,19.84L4.16,12H9V4Z" />}

                    </svg>
                  </Col>

                </Row>
              </Grid>
            </Paper>
            <Paper style={shortSheets4} zDepth={0} >
              <Grid fluid >
                <Row>
                  <Col md={3}>
                    <svg style={{ width: '60px', height: '60px' }} viewBox="0 0 24 24">
                      <path fill="#FFFF" d="M9.5,4C5.36,4 2,6.69 2,10C2,11.89 3.08,13.56 4.78,14.66L4,17L6.5,15.5C7.39,15.81 8.37,16 9.41,16C9.15,15.37 9,14.7 9,14C9,10.69 12.13,8 16,8C16.19,8 16.38,8 16.56,8.03C15.54,5.69 12.78,4 9.5,4M6.5,6.5A1,1 0 0,1 7.5,7.5A1,1 0 0,1 6.5,8.5A1,1 0 0,1 5.5,7.5A1,1 0 0,1 6.5,6.5M11.5,6.5A1,1 0 0,1 12.5,7.5A1,1 0 0,1 11.5,8.5A1,1 0 0,1 10.5,7.5A1,1 0 0,1 11.5,6.5M16,9C12.69,9 10,11.24 10,14C10,16.76 12.69,19 16,19C16.67,19 17.31,18.92 17.91,18.75L20,20L19.38,18.13C20.95,17.22 22,15.71 22,14C22,11.24 19.31,9 16,9M14,11.5A1,1 0 0,1 15,12.5A1,1 0 0,1 14,13.5A1,1 0 0,1 13,12.5A1,1 0 0,1 14,11.5M18,11.5A1,1 0 0,1 19,12.5A1,1 0 0,1 18,13.5A1,1 0 0,1 17,12.5A1,1 0 0,1 18,11.5Z" />
                    </svg>
                  </Col>
                  <Col md={3}>
                    <h1 style={{ margin: '10px 0px 0px 10px', color: 'white', fontWeight: '1.1' }}>{tweets.postiveCount + tweets.negativeCount + tweets.neutralCount}</h1>
                    <h3 style={{ margin: '0px', color: 'white', fontWeight: '1.1' }}>Comments</h3>
                  </Col>
                  <Col md={6}>
                    {/* <h3 style={{ color: '#FFFF', margin: '10px 0px 0px 35px' }}>30.15%</h3> */}
                    <svg style={{ width: '50px', height: '50px', margin: '0px 0px 0px 30px' }} viewBox="0 0 24 24">
                      <path fill="#FFFF" d="M15,20H9V12H4.16L12,4.16L19.84,12H15V20Z" />
                    </svg>
                  </Col>

                </Row>
              </Grid>
            </Paper>
            <Paper style={shortSheets5} zDepth={0} >
              <Grid fluid >
                <Row>
                  <Col md={3}>
                    <svg style={{ width: '60px', height: '60px' }} viewBox="0 0 24 24">
                      <path fill="#FFFF" d="M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 0,0 11,8A3,3 0 0,0 8,5A3,3 0 0,0 5,8A3,3 0 0,0 8,11M16,11A3,3 0 0,0 19,8A3,3 0 0,0 16,5A3,3 0 0,0 13,8A3,3 0 0,0 16,11Z" />
                    </svg>
                  </Col>
                  <Col md={3}>
                    <h1 style={{ margin: '10px 0px 0px -10px', color: 'white', fontWeight: '1.1' }}>{tweets.totalFollowers}</h1>
                    <h3 style={{ margin: '0px', color: 'white', fontWeight: '1.1' }}>Followers</h3>
                  </Col>
                  <Col md={6}>
                    {/* <h3 style={{ color: '#FFFF', margin: '10px 0px 0px 30px' }}>30.15%</h3> */}
                    <svg style={{ width: '50px', height: '50px', margin: '0px 0px 0px 30px' }} viewBox="0 0 24 24">
                      <path fill="#FFFF" d="M15,20H9V12H4.16L12,4.16L19.84,12H15V20Z" />
                    </svg>
                  </Col>

                </Row>
              </Grid>
            </Paper>

            <Paper style={shortSheets6} zDepth={0} >
              <Grid fluid >
                <Row>
                  <Col md={3}>
                    <svg style={{ width: '60px', height: '60px' }} viewBox="0 0 24 24">
                      <path fill="#FFFF" d="M6,5.75L10.25,10H7V16H13.5L15.5,18H7A2,2 0 0,1 5,16V10H1.75L6,5.75M18,18.25L13.75,14H17V8H10.5L8.5,6H17A2,2 0 0,1 19,8V14H22.25L18,18.25Z" />
                    </svg>
                  </Col>
                  <Col md={3}>
                    <h1 style={{ margin: '10px 0px 0px 10px', color: 'white', fontWeight: '1.1' }}>{tweets.reTweets}</h1>
                    <h3 style={{ margin: '0px', color: 'white', fontWeight: '1.1' }}>Retweets</h3>
                  </Col>
                  <Col md={6}>
                    {/* <h3 style={{ color: '#FFFF', margin: '10px 0px 0px 35px' }}>30.15%</h3> */}
                    <svg style={{ width: '50px', height: '50px', margin: '0px 0px 0px 30px' }} viewBox="0 0 24 24">
                      <path fill="#FFFF" d="M15,20H9V12H4.16L12,4.16L19.84,12H15V20Z" />
                    </svg>
                  </Col>

                </Row>
              </Grid>
            </Paper>
          </div>

        </div>
        <div>
          <Paper style={secondChart} zDepth={0}>
            <Grid>
              <Row>
                <Col md={2}>
                  <Row>
                    <svg style={{ width: '160px', height: '160px' }} viewBox="0 0 24 24">
                      <path fill="#00FF01" d="M12,17.5C14.33,17.5 16.3,16.04 17.11,14H6.89C7.69,16.04 9.67,17.5 12,17.5M8.5,11A1.5,1.5 0 0,0 10,9.5A1.5,1.5 0 0,0 8.5,8A1.5,1.5 0 0,0 7,9.5A1.5,1.5 0 0,0 8.5,11M15.5,11A1.5,1.5 0 0,0 17,9.5A1.5,1.5 0 0,0 15.5,8A1.5,1.5 0 0,0 14,9.5A1.5,1.5 0 0,0 15.5,11M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                    </svg>
                  </Row>
                  <Row style={{ marginLeft: '50px', fontSize: '20px' }}>
                    <span>{calcImpact.positiveCount} %</span>
                  </Row>
                  <Row style={{ marginLeft: '34px', fontSize: '20px' }}>
                    <span>Positive</span>
                  </Row>

                </Col>
                <Col md={2}>
                  <Row>
                    <svg style={{ width: '160px', height: '160px' }} viewBox="0 0 24 24">
                      <path fill="#E1AF04" d="M8.5,11A1.5,1.5 0 0,1 7,9.5A1.5,1.5 0 0,1 8.5,8A1.5,1.5 0 0,1 10,9.5A1.5,1.5 0 0,1 8.5,11M15.5,11A1.5,1.5 0 0,1 14,9.5A1.5,1.5 0 0,1 15.5,8A1.5,1.5 0 0,1 17,9.5A1.5,1.5 0 0,1 15.5,11M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M9,14H15A1,1 0 0,1 16,15A1,1 0 0,1 15,16H9A1,1 0 0,1 8,15A1,1 0 0,1 9,14Z" />
                    </svg>
                  </Row>
                  <Row style={{ marginLeft: '50px', fontSize: '20px' }}>
                    <span>{calcImpact.neutralCount} %</span>
                  </Row>
                  <Row style={{ marginLeft: '34px', fontSize: '20px' }}>
                    <span>Neutral</span>
                  </Row>
                </Col>
                <Col md={2}>
                  <Row>
                    <svg style={{ width: '160px', height: '160px' }} viewBox="0 0 24 24">
                      <path fill="#F00000" d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M15.5,8C16.3,8 17,8.7 17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M12,14C13.75,14 15.29,14.72 16.19,15.81L14.77,17.23C14.32,16.5 13.25,16 12,16C10.75,16 9.68,16.5 9.23,17.23L7.81,15.81C8.71,14.72 10.25,14 12,14Z" />
                    </svg>
                  </Row>
                  <Row style={{ marginLeft: '50px', fontSize: '20px' }}>
                    <span>{calcImpact.negativeCount} %</span>
                  </Row>
                  <Row style={{ marginLeft: '34px', fontSize: '20px' }}>
                    <span>Negative</span>
                  </Row>
                </Col>
                <Col md={4} className="mostUsedWord">
                  {/* <div style={{display:'inline-block', height: '50px', width:'2px',border: '2px solid gray'}}></div> */}
                  <h5> Most Used words </h5>
                  <ul>
                    <li style={{ color: '#2BCEAF', padding: '8px' }}>{this.words[0].word}</li>
                    <li style={{ color: '#FFCC5F', padding: '8px' }}>{this.words[2].word}</li>
                    <li style={{ color: '#FF8042', padding: '8px' }}>{this.words[3].word}</li>
                    <li style={{ color: '#FF8042', padding: '8px' }}>{this.words[1].word}</li>
                    <li style={{ color: '#FF8042', padding: '8px' }}>{this.words[4].word}</li>
                  </ul>
                  {/* <ReactWordCloud
	words={this.words}
	wordCountKey={WORD_COUNT_KEY}
	wordKey={WORD_KEY}
      /> */}

                </Col>
              </Row>
            </Grid>
          </Paper>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.DashboardReducer.status,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboaradContainer);
      // export default DashboaradContainer;
