import { Carousel } from 'react-bootstrap'

export default function HomeCarousel() {
    return (
        <div>
            <Carousel>
                <Carousel.Item interval={2000} style={{height: 'calc(100vh - 200px)', overflow: 'hidden'}}>
                    <img
                        className="d-block w-100"
                        src="/img/Carousel1.jpeg"
                        alt="First slide"
                        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000} style={{height: 'calc(100vh - 200px)', overflow: 'hidden'}}>
                    <img
                        className="d-block w-100"
                        src="/img/Carousel2.jpeg"
                        alt="Second slide"
                        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000} style={{height: 'calc(100vh - 200px)', overflow: 'hidden'}}>
                    <img
                        className="d-block w-100"
                        src="/img/Carousel3.png"
                        alt="Third slide"
                        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}