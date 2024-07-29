import React from 'react'
import './Eventdetails.css';
import SimpleImageSlider from "react-simple-image-slider";
import Navbar from './Navbar';

const event = {
    date: '15 March 2024',
    time: '10:00 AM',
    title: 'EVENT NAME',
    description: `fdfdydkufiulguhuiftywyfdcygioiuryteyduybip/ johyiy5swsukgoh;iyurwtruguhp; uoyyuetrwerfchohofufifgiuguigihfdesgl;lkoutdcnlkk;iyfykjklnjn---------------gchcgtutv---------------.`,
    location: 'Banglore ',
    imageUrl: ['https://cdn.prod.website-files.com/61f29c609f84a86e418fbcfb/63ecdf6e6df724eab1f0e8ca_20230215T0132-25bece5c-5ab8-4c33-98c7-60ad2668054b.webp',
      'https://www.eventbrite.com/blog/wp-content/uploads/2023/02/Frame-1-3-min-1-3.png',
      'https://icm.aexp-static.com/content/dam/contenthub/us/en/ach-images/2023/08/business-event-header.jpg']
};

const Eventdetails = () => {
    return (
        <div>
        <Navbar/>
        <div className="event-container-wrapper">
            <div className="event-container">
            <div className="event-slider">
                    <SimpleImageSlider 
                        images={event.imageUrl.map(url => ({ url }))}
                        autoPlay={true}
                        width={600}
                        height={400}
                        slideDuration={0.5}
                    />
                </div>
                
                {/* <div>
                    <img className="event-image" src={event.imageUrl} alt="Event" style={{
                      borderRadius:'1%'
                    }}  />
                </div> */}
                
                <div className="event-content">
                    <h2 className="event-title">{event.title}</h2>
                    <div className="event-details">
                        <p><strong>Date:</strong> {event.date}</p>
                        <p><strong>Time:</strong> {event.time}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                    </div>
                    <p className="event-description">{event.description}</p>
                </div>
                
            </div>
        </div>
        </div>
    );
};

export default Eventdetails;
