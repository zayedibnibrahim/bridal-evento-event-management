import React from 'react';
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import img1 from '../../../images/bg-slide-1.jpg'
import img2 from '../../../images/bg-slide-2.jpg'
import img3 from '../../../images/bg-slide-3.jpg'

import { Gallery, Item } from 'react-photoswipe-gallery'
const GalleryImg = () => {
    return (
        <section className="container p-5" id="gallery">
            <div className="gallery-info pb-5">
                <h1 className="brand-text text-center">Image Gallery</h1>
            </div>
            <Gallery>
                <div className="row">
                    <div className="col-md-4 p-3">
                        <Item
                            original={img1}
                            thumbnail={img1}
                            width="800"
                            height="768"
                        >
                            {({ ref, open }) => (
                                <img alt="" ref={ref} onClick={open} src={img1} className="img-fluid"/>
                            )}
                        </Item>
                    </div>
                    <div className="col-md-4 p-3">
                        <Item
                            original={img2}
                            thumbnail={img2}
                            width="800"
                            height="768"
                        >
                            {({ ref, open }) => (
                                <img alt="" ref={ref} onClick={open} src={img2} className="img-fluid"/>
                            )}
                        </Item>
                    </div>
                    <div className="col-md-4 p-3">
                        <Item
                            original={img3}
                            thumbnail={img3}
                            width="800"
                            height="768"
                        >
                            {({ ref, open }) => (
                                <img alt="" ref={ref} onClick={open} src={img3} className="img-fluid"/>
                            )}
                        </Item>
                    </div>
                </div>
            </Gallery>
        </section>
    );
};

export default GalleryImg;