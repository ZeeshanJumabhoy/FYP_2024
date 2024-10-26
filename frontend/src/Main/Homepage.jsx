import React from 'react';
import Navbar from "./Navbar";
import Topbar from "./Topbar"


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
      <Topbar />
      <Navbar />
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="uploads\app\KH-HERO-1.png" className="d-block w-100" alt="..." style={{ height: '80%' }} />
            <div className="slider-one-a">
              <a href="add_bloodbank.html" className="btn">Register Now</a>
            </div>
          </div>
          <div className="carousel-item">
            <img src="uploads\app\KH-HERO-2.png" className="d-block w-100" alt="..." style={{ height: '80%' }} />
            <div className="slider-one-b two">
              <a href="register.html" className="btn">Request Blood</a>
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

      {/*---------faqs part------------------------*/}
      <section className="faqs-sec">
        <div className="text-center" id="text-part">
          <h1>Frequently Asked Questions</h1>
          <hr className="hr-line" />
        </div>
        <div className="container" style={{ padding: '46px' }}>
          <div className="row">
            <div className="col-lg-7 col-md-12 col-sm-12">
              <div id="accordion" className="acc">
                {/*----------------first----------*/}
                <div className="card">
                  <div className="card-header card-head" id="headingOne">
                    <h5 className="mb-0">
                      <button className="btn btn-link " data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        1. Am I eligible to donate blood?
                      </button>
                    </h5>
                  </div>
                  <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                    <div className="card-body acc-p">
                      To be eligible for donation, a person should weigh a minimum of 50 kgs. The age range for a
                      donor should be between 18 and 65 years. Furthermore, the health of the individual should be
                      satisfactory and the minimum Haemoglobin level should be 12.5%. It is also necessary that the
                      donor is not suffering from any infectious diseases. Additionally, no alcohol should be
                      consumed 48 hours prior to the donation.
                    </div>
                  </div>
                </div>
                {/*------------------second-------------*/}
                <div className="card">
                  <div className="card-header card-head" id="headingTwo">
                    <h5 className="mb-0">
                      <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        2. What should I do after donating blood?
                      </button>
                    </h5>
                  </div>
                  <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                    <div className="card-body acc-p">
                      Refrain from any strenuous activity or physical exercise. Make sure to consume adequate
                      amounts of liquids to replace the body's water supply.
                    </div>
                  </div>
                </div>
                {/*---------third---------*/}
                <div className="card">
                  <div className="card-header card-head" id="headingThree">
                    <h5 className="mb-0">
                      <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        3. How can I use the App to offer blood donation?
                      </button>
                    </h5>
                  </div>
                  <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <div className="card-body acc-p">
                      The App Facilitates users to Find Blood Banks, Hospitals, and Labs nearby, Also This app
                      allows users to fill out donation forms schedule appointments at the nearby blood bank and
                      donate blood. This app also allows users to request blood from the nearby blood bank and see
                      their availability. This way users can reduce time and find blood immediately.
                    </div>
                  </div>
                </div>
                {/*----fouth---------*/}
                <div className="card">
                  <div className="card-header card-head" id="headingThree">
                    <h5 className="mb-0">
                      <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                        4. Can I make a request for a donation while I am traveling outside my city of residence?
                      </button>
                    </h5>
                  </div>
                  <div id="collapseFour" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <div className="card-body acc-p">
                      Yes, you can make requests sitting anywhere. The App would automatically send your requests
                      to the nearby blood banks.
                    </div>
                  </div>
                </div>
                {/*---------fifth-------*/}
                <div className="card">
                  <div className="card-header card-head" id="headingThree">
                    <h5 className="mb-0">
                      <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                        5. Can I make a request for a specific rare blood group?
                      </button>
                    </h5>
                  </div>
                  <div id="collapseFive" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <div className="card-body acc-p">
                      You can make such a request. The Website/App will send your request to the specific/ rare
                      blood group in the blood banks.
                    </div>
                  </div>
                </div>
                {/*---------sixth---------*/}
                <div className="card">
                  <div className="card-header card-head" id="headingThree">
                    <h5 className="mb-0">
                      <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                        6. I am over the prescribed age for making a donation. Can I still submit a donation
                        request?
                      </button>
                    </h5>
                  </div>
                  <div id="collapseSix" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <div className="card-body acc-p">
                      Yes, you can still use the Website/App to make requests for yourself or for your friends/
                      family.
                    </div>
                  </div>
                </div>
                {/*-----------seventh----------------*/}
                <div className="card">
                  <div className="card-header card-head" id="headingThree">
                    <h5 className="mb-0">
                      <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                        7. How much blood will I lose?
                      </button>
                    </h5>
                  </div>
                  <div id="collapseSeven" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <div className="card-body acc-p">
                      Not enough for you to miss! Each full donation is 450 ml. Your body naturally replaces the
                      lost fluid in a very short time.
                    </div>
                  </div>
                </div>
                {/*--------eighth-------------------*/}
                <div className="card">
                  <div className="card-header card-head" id="headingThree">
                    <h5 className="mb-0">
                      <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                        8. How will giving blood affect my health?
                      </button>
                    </h5>
                  </div>
                  <div id="collapseEight" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <div className="card-body acc-p">
                      We will only accept donations from people who have good health. Donors will only be donating
                      a small amount of their blood, usually around 5%, and there typically are no post-donation
                      side effects. The liquid taken will be replenished within a day, and the cells in the blood
                      will be replenished in a few weeks.
                    </div>
                  </div>
                </div>
                {/*---------ninth_--------*/}
                <div className="card">
                  <div className="card-header card-head" id="headingThree">
                    <h5 className="mb-0">
                      <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                        9. What if I need blood?
                      </button>
                    </h5>
                  </div>
                  <div id="collapseNine" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <div className="card-body acc-p">
                      In the case of an emergency, the hospital will supply blood. Typically, the hospital will
                      prefer to source the blood from a donor who is related or close friend of the person
                      receiving the blood.
                    </div>
                  </div>
                </div>
                {/*-------tenth--------------*/}
                <div className="card">
                  <div className="card-header card-head" id="headingThree">
                    <h5 className="mb-0">
                      <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                        10. What if I need to take medication?
                      </button>
                    </h5>
                  </div>
                  <div id="collapseTen" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <div className="card-body acc-p">
                      Certain drugs or the health conditions are prescribed might prohibit you from giving blood,
                      whereas some may not be an issue.
                    </div>
                  </div>
                </div>
                {/*--------eleven-------------*/}
                <div className="card">
                  <div className="card-header card-head" id="headingThree">
                    <h5 className="mb-0">
                      <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven">
                        11. Warning!
                      </button>
                    </h5>
                  </div>
                  <div id="collapseEleven" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <div className="card-body acc-p">
                      Never stop taking your medication just to donate blood.
                    </div>
                  </div>
                </div>
                {/*------------tweve------------*/}
                <div className="card">
                  <div className="card-header card-head" id="headingThree">
                    <h5 className="mb-0">
                      <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwelve" aria-expanded="false" aria-controls="collapseTwelve">
                        12. What can I do before and after giving blood?
                      </button>
                    </h5>
                  </div>
                  <div id="collapseTwelve" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <div className="card-body acc-p">
                      It is essential to consume an adequate amount of fluids before and after giving blood, but
                      alcoholic beverages should be avoided. Additionally, it is important to maintain a regular
                      eating pattern and to inform the blood donation centre if you have skipped a meal or if you
                      are following a particular dietary regimen.
                    </div>
                  </div>
                </div>
                {/*--------------thirteen---------*/}
                <div className="card">
                  <div className="card-header card-head" id="headingThree">
                    <h5 className="mb-0">
                      <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThirteen" aria-expanded="false" aria-controls="collapseThirteen">
                        13. Can I smoke after giving blood?
                      </button>
                    </h5>
                  </div>
                  <div id="collapseThirteen" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <div className="card-body acc-p">
                      It is best that you do not smoke for two hours after donating, as it can cause dizziness or
                      even make you faint.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12">
              <img src="uploads/app/blood.jpg" alt="blood check image" className="acc-img" />
              <div id="accordion" className="acc1">
                {/*-------fourteen----------*/}
                <div className="card">
                  <div className="card-header card-head" id="headingThree">
                    <h5 className="mb-0">
                      <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFourteen" aria-expanded="false" aria-controls="collapseFourteen">
                        14. Can I bring a friend?
                      </button>
                    </h5>
                  </div>
                  <div id="collapseFourteen" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <div className="card-body acc-p">
                      Yes. Your friend may be interested when he or she sees how painless and simple it is to give
                      blood.
                    </div>
                  </div>
                </div>
                {/*---------fifteen---------------*/}
                <div className="card">
                  <div className="card-header card-head" id="headingThree">
                    <h5 className="mb-0">
                      <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFifteen" aria-expanded="false" aria-controls="collapseFifteen">
                        15. Can I go back to work on the same day?
                      </button>
                    </h5>
                  </div>
                  <div id="collapseFifteen" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <div className="card-body acc-p">
                      It is important to have a full rest and some nourishment after a blood donation session. On
                      rare occasions, individuals may feel faint after donating blood, so if your job includes any
                      of the following activities, it is best to donate blood at the end of your shift: driving a
                      truck or train, working for emergency services, or any work that involves heights. This is to
                      make sure you are not endangering yourself or others.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*footer*/}
      <footer className="padding_4x footer-bg">
        <div className="flex">
          <section className="flex-content padding_1x">
            <h3>Save Life</h3>
            <a href="register.html">Donate Blood</a>
            <a href="register.html">Request Blood</a>
            <a href="find_bloodbank.html">Find Blood Bank</a>
            <a href="find_hospital.html">Find Hospital</a>
            <a href="find_camp.html">Find Blood Camp</a>
            <a href="find_lab.html">Find Labs</a>
          </section>
          <section className="flex-content padding_1x">
            <h3>Register</h3>
            <a href="signin.html">Donor Signup</a>
            <a href="add_bloodbank.html">Blood Bank Sign Up</a>
            <a href="add_hospital.html">Hospital Sign Up</a>
            <a href="add_lab.html"> Lab Sign Up</a>
          </section>
          <section className="flex-content padding_1x">
            <h3>Company</h3>
            <a href="about.html"> About Us</a>
            <a href="contact.html">Contact Us</a>
            <a href="privacy-policy.html">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </section>
          <section className="flex-content padding_1x">
            <h3>Download App </h3>
            <div className="imgg-a">
              <a href="https://play.google.com/store/apps/details?id=com.bloodlinkapp.in" target="_main"><img src="uploads/app/googly.png" /></a>
            </div>
          </section>
          <section className="flex-content padding_1x">
            {/* <h3>Blood links logo</h3> */}
            <div className="logo-img5">
              <img src="uploads/app/logo.svg" />
            </div>
            <p>Blood Links is an platform that helps to streamline blood donation and blood request which puts the power
              to save a life in the palm of your hand. </p>
            <section className="my-anchor-foot">
              <a href="#" className="my-anchor-yo"><i className="fa fa-facebook" /></a>
              <a href="#" className="my-anchor-yo"><i className="fa fa-twitter" /></a>
              <a href="#" className="my-anchor-yo"><i className="fa fa-dribbble" /></a>
              <a href="#" className="my-anchor-yo"><i className="fa fa-linkedin" /></a>
            </section>
          </section>
        </div>
        <div className="flex">
        </div>
      </footer>

      <div className="bottom-footer-1">
        <p>Copyright 2022 Colossal Health Private Limited. Powered by <a href="https://techtaru.com/" target="_main">Techtaru Digital</a></p>
      </div>
    </div>
  );
}

export default Homepage;
