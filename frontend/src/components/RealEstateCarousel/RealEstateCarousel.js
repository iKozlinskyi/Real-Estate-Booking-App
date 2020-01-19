import React, {Component} from 'react';
import {Carousel} from "react-responsive-carousel";
import "./carousel-styles-forked.css"
import {withElementClassName} from "../HOCs/withElementClassName";

class RealEstateCarousel extends Component {
  constructor(props) {
    super(props);

    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  handleSliderChange(slideNumber) {
    this.props.onSlideChange(slideNumber);
  }

  render() {

    return (
          <Carousel
              showStatus={false}
              showIndicators={false}
              className={this.props.elementClassName}
              onClickItem={this.props.onSlideClick}
              onChange={this.handleSliderChange}
              selectedItem={this.props.slideNumber}
          >
            {this.props.slides.map(slide => (
                <div key={slide.id}>
                  <img src={slide.imgSrc} alt={slide.name}/>
                  <p className="legend">{slide.name}</p>
                </div>
            ))}
          </Carousel>
    );
  }
}

export default withElementClassName(RealEstateCarousel);