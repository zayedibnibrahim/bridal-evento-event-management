import React from 'react';
import aboutImg from '../../../images/aboutImg.jpg'
const About = () => {
    return (
        <section style={{backgroundColor: '#dff9fb'}}>
            <div className="container p-5">
                <div className="row d-flex align-items-start">
                    <div className="about-img col-md-4">
                        <img src={aboutImg} alt="" className="img-fluid" />
                    </div>
                    <div className="about-info col-md-8">
                        <h2 className="brand-text text-start">Why To chose Us?</h2>
                        <p className="text-secondary test-start">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis esse quos debitis eius molestias, optio ex delectus labore facere atque consequatur sint recusandae officiis nam ratione cupiditate libero illo neque culpa aliquam necessitatibus reprehenderit. Modi doloribus quaerat culpa eos error laborum corporis expedita quas repellat aspernatur maiores fugiat, voluptate cupiditate eum molestiae animi temporibus tempore maxime sint provident. Perspiciatis repellendus dolores quae aperiam vel nisi! Eos est, eligendi debitis incidunt obcaecati quis! Assumenda, magnam? Fugiat, dolorem quis. Adipisci commodi eius consectetur reprehenderit vitae autem aut omnis, ratione perferendis sed in nam laudantium odit culpa earum molestiae assumenda animi. Impedit, minus? Esse quae incidunt architecto a maxime perspiciatis? Blanditiis sunt fugiat nesciunt cupiditate amet animi laboriosam mollitia corporis temporibus, minus sequi?</p>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default About;