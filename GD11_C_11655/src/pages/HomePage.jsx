import { Container, Row, Col } from "react-bootstrap";
import ImageCarousel from "../components/ImageCarousel";
import imgFeaturette1 from "../assets/images/featurette-1.jpg";
import imgFeaturette2 from "../assets/images/featurette-2.jpg";
import imgBakery1 from "../assets/images/bakery1.jpeg";
import imgBakery2 from "../assets/images/bakery2.jpeg";
import imgBakery3 from "../assets/images/bakery3.jpeg";

const images = [
    {
        img: imgBakery1,
        title: "First slide label",
        description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    },
    {
        img: imgBakery2,
        title: "Second slide label",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        img: imgBakery3,
        title: "Third slide label",
        description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    },
];

const cardData = [
    {
        title: "Fresh Bread",
        description: "Our signature freshly baked bread made with premium ingredients",
        image: imgBakery1,
    },
    {
        title: "Sweet Pastries",
        description: "Delightful selection of pastries perfect for any occasion",
        image: imgBakery2,
    },
    {
        title: "Special Cakes",
        description: "Custom-made cakes for celebrations and special moments",
        image: imgBakery3,
    },
    {
        title: "Artisan Selection",
        description: "Handcrafted treats made by our expert bakers",
        image: imgFeaturette1,
    },
];

const HomePage = () => {
    return (
        <>
            <ImageCarousel images={images} />
            <Container className="mt-5">
                <Row>
                    <Col md={7}>
                        <h2 className="fw-normal">
                            Bakery pertama dan satu-satunya <strong>yang fiksional</strong>.
                        </h2>
                        <p className="lead">
                            Diciptakan oleh <strong>Kevin Stevano Rianto</strong>, Mahasiswa Universitas Atma Jaya Yogyakarta dari Program Studi Informatika.
                        </p>
                        <p className="lead">
                            Nomor Pokok Mahasiswa: <strong>220711655</strong>
                        </p>
                    </Col>
                    <Col md={5}>
                        <img src={imgFeaturette1} className="img-fluid mx-auto rounded-shadow" role="img" aria-label="Gambar featurette 1" />
                    </Col>
                </Row>
                <hr className="mt-5 mb-5"/>

                {cardData.map((card, index) => (
                    <Row key={index} className="mb-5">
                        {index % 2 === 0 ? (
                            <>
                                <Col md={7}>
                                    <h2 className="fw-normal">{card.title}</h2>
                                    <p className="lead">{card.description}</p>
                                </Col>
                                <Col md={5}>
                                    <img 
                                        src={card.image} 
                                        className="img-fluid mx-auto rounded-shadow" 
                                        role="img" 
                                        aria-label={card.title} 
                                    />
                                </Col>
                            </>
                        ) : (
                            <>
                                <Col md={5}>
                                    <img 
                                        src={card.image} 
                                        className="img-fluid mx-auto rounded-shadow" 
                                        role="img" 
                                        aria-label={card.title} 
                                    />
                                </Col>
                                <Col md={7}>
                                    <h2 className="fw-normal">{card.title}</h2>
                                    <p className="lead">{card.description}</p>
                                </Col>
                            </>
                        )}
                        {index !== cardData.length - 1 && <hr className="mt-5 mb-5"/>}
                    </Row>
                ))}
            </Container>
        </>
    );
};

export default HomePage;