import { Carousel } from 'react-bootstrap'

export default function HomeCarousel() {
    return (
        <div>
            <Carousel>
                <Carousel.Item interval={2000} style={{ height: 'calc(100vh - 120px)', minHeight: '450px', overflow: 'hidden' }}>
                    <img
                        className="d-block w-100"
                        src="/img/carousel.jpeg"
                        alt="First slide"
                        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                    />
                    <Carousel.Caption>
                        <h3>Visualize it !</h3>
                        <p>Learn algorithms through visualization of it's working process</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000} style={{ height: 'calc(100vh - 120px)', minHeight: '450px', overflow: 'hidden' }}>
                    <img
                        className="d-block w-100"
                        src="/img/carousel2.jpeg"
                        alt="Second slide"
                        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                    />
                    <Carousel.Caption style={{ color: '#787878' }}>
                        <h3>Interect with Algorithms</h3>
                        <p>Manipulate and create your own dataset and run against your fav algorithms</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000} style={{ height: 'calc(100vh - 120px)', minHeight: '450px', overflow: 'hidden' }}>
                    <img
                        className="d-block w-100"
                        src="/img/carousel3.png"
                        alt="Third slide"
                        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                    />
                    <Carousel.Caption>
                        <h3>Chat with your peers</h3>
                        <p>Chat with your peers in dedicated room made for Algorithms</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}