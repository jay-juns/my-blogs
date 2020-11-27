import React, { Component } from 'react';

import Card from './card';
import Button from './../Forms/Button';

import Image01 from './../../assets/item/item1.jpg';
import Image02 from './../../assets/item/item2.jpg';
import Image03 from './../../assets/item/item3.jpg';

import './styles.scss';

export class slider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      current_card: 1
    }
  }

  componentDidMount() {
    let first_card_clone = this.card_container.children[0].cloneNode(true);
    let last_card_clone = this.card_container.children[this.card_container.children.length - 1].cloneNode(true);

    this.card_container.insertBefore(last_card_clone, this.card_container.children[0]);
    this.card_container.append(first_card_clone);
    this.card_container.style.transitionDuration = "0.0s";
    this.card_container.style.transform = `translate(-${1080}px)`;
  }

  handle_next = () => {
    if (this.state.current_card < this.card_container.children.length - 1) {
      let new_current_card = this.state.current_card + 1;

      this.setState({ current_card: new_current_card }, () => {
        this.card_container.style.transitionDuration = "0.5s";
        this.card_container.style.transform = `translate(-${1080 * this.state.current_card}px)`;

        if (this.state.current_card === this.card_container.children.length - 1) {
          setTimeout(() => {
            this.card_container.style.transitionDuration = "0.0s";
            this.card_container.style.transform = `translate(-${1080}px)`;

            this.setState({ current_card: 1 });
          }, 502);
        }
      });
    } else {
      return;
    }
  }

  handle_previous = () => {
    if (this.state.current_card > 0) {
      let new_current_card = this.state.current_card - 1;

      this.setState({ current_card: new_current_card }, () => {
        this.card_container.style.transitionDuration = "0.5s";
        this.card_container.style.transform = `translate(-${1080 * this.state.current_card}px)`;

        if (this.state.current_card === 0) {
          setTimeout(() => {
            this.card_container.style.transitionDuration = "0.0s";
            this.card_container.style.transform = `translate(-${1080 * (this.card_container.children.length -2)}px)`;

            this.setState({ current_card: this.card_container.children.length - 2 });
          }, 502);
        }
      });
    } else {
      return;
    }
  }
  
  render() {
    return (
      <div>
        <Button onClick={this.handle_previous}>이전</Button>
        <Button onClick={this.handle_next}>다음</Button>
        <div className="view-port">
          <div ref={ref_id => this.card_container = ref_id} className="card-container">
            <Card card_img={Image01}/>
            <Card card_img={Image02}/>
            <Card card_img={Image03}/>
          </div>
        </div>
      </div>
    )
  }
}

export default slider;
