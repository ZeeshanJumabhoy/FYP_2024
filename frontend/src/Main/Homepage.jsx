import React from 'react';
import FAQSection from './FAQSection';
import { Link, useNavigate } from "react-router-dom";


const Homepage = () => {
  return (
    <div>
      <div id="preloader">
        <span className="margin-bottom"><img src="uploads\app\loader.gif" style={{ height: '100px', width: '100px' }} alt="" /></span>
      </div>
      {/* <meta name="viewport" content="width=1000; user-scalable=0;" /> */}
      <meta name="viewport" content="width=device-width" />
      {/* Start Heder Area */}
      {/* Menu For Mobile Device */}
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="uploads\app\KH-HERO-1.png" className="d-block w-100" alt="..." style={{ height: '80%' }} />
            <div className="slider-one-a two">
              <a href="/register" className="btn">Register Indivisual Now</a>
            </div>
          </div>
          <div className="carousel-item">
            <img src="uploads\app\KH-HERO-2.png" className="d-block w-100" alt="..." style={{ height: '80%' }} />
            <div className="slider-one-b two">
              <a href="/family-register" className="btn">Register Family Now</a>
            </div>
          </div>
          <div className="carousel-item">
            <img src="uploads\app\KH-HERO-3.png" className="d-block w-100" alt="..." style={{ height: '80%' }} />
            <div className="slider-one-c two">
              <a href="add_camps.html" className="btn">Register Blood Camp</a>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
      <section className="pt-0 filter main_heading my-5">
        <div className="text-center sec">
          <h1 className="our-aim-h1">Our Aim</h1>
          <hr className="hr-ouraim" />
        </div>
        <div className="container container-aim">
          <div className="row">
            <div className="col-lg-3 col-sm-10 mb-3">
              <div className="new-card">
                <div className="card">
                  <img src="uploads/app/New Project.png" alt="img description" className="img-aim-a" />
                </div>
                <div className="card-body text-center card-here">
                  <p className="card-text card-text-our">Digitalizing of current Blood Donation Process</p>
                </div>
                {/* <div> <a href="#" class="btn new-card-btn">Read More</a></div> */}
              </div>
            </div>
            <div className="col-lg-3 col-sm-10 mb-3">
              <div className="new-card">
                <div className="card">
                  <img src="uploads/app/New Project (1).png" alt="img description" className="img-aim-a" />
                </div>
                <div className="card-body text-center card-here">
                  <p className="card-text card-text-our">Promote ease of donating blood</p>
                </div>
                {/* <div> <a href="#" class="btn new-card-btn">Read More</a></div> */}
              </div>
            </div>
            <div className="col-lg-3 col-sm-10 mb-3">
              <div className="new-card">
                <div className="card">
                  <img src="uploads/app/New Project (3).png" alt="img description" className="img-aim-a" />
                </div>
                <div className="card-body text-center card-here">
                  <p className="card-text card-text-our">Spread Blood Donation Awareness</p>
                </div>
                {/* <div> <a href="#" class="btn new-card-btn" style="background: black;">Read More</a></div> */}
              </div>
            </div>
            <div className="col-lg-3 col-sm-10 mb-3">
              <div className="new-card">
                <div className="card">
                  <img src="uploads/app/New Project (2).png" alt="img description" className="img-aim-a" />
                </div>
                <div className="card-body text-center card-here">
                  <p className="card-text card-text-our">Build a sustainable Blood ecosystem.</p>
                </div>
                {/* <div> <a href="#" class="btn new-card-btn">Read More</a></div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="left-section">
          <img
            src="https://storage.googleapis.com/a1aa/image/MCedNM46C2SEKSfo4Su5ZlYJ4MCBtFtwy6ipCkJuaLaJgRmTA.jpg"
            alt="Heart with blood drop icon"
            style={{ display: 'block', margin: '0 auto' }} // Centers the image
          />
          <h2>Our Services</h2>
          <p>We offer a comprehensive range of services to meet the diverse needs of our partner institutions and the community at large:</p>
        </div>

        <div className="right-section">
          <div className="service-box">Blood Donation</div>
          <div className="service-box">Blood Collection</div>
          <div className="service-box">Emergency Response</div>
          <div className="service-box">Blood Processing &amp; Testing</div>
          <div className="service-box">Blood Storage &amp; Distribution</div>
          <div className="service-box">Training &amp; Education</div>
        </div>
      </div>
      <div className="container-B">
        <div className="card-B">
          <img alt="Laptop showing RapidPass page" height={200} src="https://storage.googleapis.com/a1aa/image/KCEkGLFuEHJfJqzZ5Ydn0nTOef3U7NnPJN6iwlWnnElzeHZOB.jpg" width={300} />
          <h2>Start Your RapidPass</h2>
          <p>Donating blood today? Complete your pre-reading and health history questions online using any device, before
            visiting your blood drive location. </p>
          <br /><button>START NOW</button>
        </div>
        <div className="card-B">
          <img alt="Stethoscope and medical forms" height={200} src="https://storage.googleapis.com/a1aa/image/jD3lIqkozVpCMlfo1zddeXPbnMCpsEhQ14V7cUfBrI74eHZOB.jpg" width={300} />
          <h2>Am I Eligible to Donate Blood?</h2>
          <p>Are you eligible for blood donation? Find out about the eligibility requirements to donate blood today.
            Learn about general health, travel, medications, tattoos and more.</p>
          <button>LEARN MORE</button>
        </div>
        <div className="card-B">
          <img alt="Person with a bandage on their arm after donating blood" height={200} src="https://storage.googleapis.com/a1aa/image/OH3fuRG2nQQrUqbdIQ1SYV7dJ44adjEfWYgVwJUW5fb3eHZOB.jpg" width={300} />
          <h2>Help Sickle Cell Patients</h2>
          <p>Blood donors who are Black play a critical role in helping sickle cell disease patients receive the most
            compatible blood match. Donors needed to meet this urgent need.</p>
          <button>LEARN MORE</button>
        </div>
      </div>
      <section className="pt-50 pb-50">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-sm-12 col-md-12 mb-5">
              <div className="help">
                <div className="help-left-img">
                  <img src="uploads/app/Homepage-donate-blood-bottom.jpg" alt="image" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 col-md-12 mb-5">
              <div className="help-text">
                <h6> Benefits of Blood Donation</h6>
                <h4 style={{ fontSize: '35px' }}> Save Lives, Be a Real Hero</h4>
                <p>Donating blood is a noble act that not everyone can do. With advancements in medicine, the need for
                  blood has increased threefold since the industrial revolution. Every year, India has a deficit of
                  between 30% and 35%. It is absurd to say that the country cannot meet this requirement with 1.2
                  billion people. The real challenge is not the lack of blood donors, but finding someone willing to
                  donate when needed. Therefore, the aim should be to create a system of people who can help each
                  other in emergencies.
                  Below are some benefits donating blood:
                </p>
                <div className="row">
                  <div className="col-md-6 col-sm-6 col-6">
                    <ul className="ul-one">
                      <li><i className="fa fa-angle-double-right" aria-hidden="true" />Reduces Risk of Cancer</li>
                      <li><i className="fa fa-angle-double-right" aria-hidden="true" />Helps in Weight Loss</li>
                      <li><i className="fa fa-angle-double-right" aria-hidden="true" />Replenishes Blood</li>
                      <li><i className="fa fa-angle-double-right" aria-hidden="true" />Lower Cholestrol Level</li>
                    </ul>
                  </div>
                  <div className="col-md-6 col-sm-6 col-6">
                    <ul className="ul-one">
                      <li><i className="fa fa-angle-double-right" aria-hidden="true" />Boosts the Production of
                        RBC(Red Blood Cells)</li>
                      <li><i className="fa fa-angle-double-right" aria-hidden="true" />Makes the Donor
                        Psychologically Rejuvenated</li>
                    </ul>
                  </div>
                </div>
                <a href="process_of_blood.html" className="btn">Explore New</a>
              </div>
            </div>
          </div>
        </div></section>

      <FAQSection />
    </div>
  );
}

export default Homepage;
