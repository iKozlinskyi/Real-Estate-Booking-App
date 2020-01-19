import React, {Component} from 'react';
import {Carousel} from "react-responsive-carousel";
import "./carousel-styles-forked.css"
import {withElementClassName} from "../HOCs/withElementClassName";

class RealEstateCarousel extends Component {
  constructor() {
    super();

    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  handleSliderChange(slideNumber) {
    this.props.onSlideChange(slideNumber);
  }

  render() {
    const slides = this.props.slides;
    return (
          <Carousel
              showStatus={false}
              showIndicators={false}
              className={this.props.elementClassName}
              onClickItem={this.props.onSlideClick}
              onChange={this.handleSliderChange}
              selectedItem={this.props.slideNumber}
          >
            {slides.map(slide => (
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