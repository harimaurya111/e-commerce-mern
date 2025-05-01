import React, { useState, useEffect } from 'react';
import dealsImage from '../../assets/deals.png';

const DealsSection = () => {
    // Set the target countdown date (e.g., end of the month)
    const targetDate = new Date("2025-03-31T23:59:59").getTime();

    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className='section__container deals__container'>
            <div>
                <img src={dealsImage} alt="Deals" />
            </div>

            <div className='deals__content'>
                <h5>Get up to 20% Discount</h5>
                <h4>Deals of this month</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, soluta ea! Delectus vero vitae voluptatibus hic repellat dolores neque nihil quis non, sed ullam natus?</p>

                <div className='deals__countdown flex-wrap'>
                    <div className='deals__countdown__card'>
                        <h4>{timeLeft.days}</h4>
                        <p>Days</p>
                    </div>

                    <div className='deals__countdown__card'>
                        <h4>{timeLeft.hours}</h4>
                        <p>Hours</p>
                    </div>

                    <div className='deals__countdown__card'>
                        <h4>{timeLeft.minutes}</h4>
                        <p>Mins</p>
                    </div>

                    <div className='deals__countdown__card '>
                        <h4>{timeLeft.seconds}</h4>
                        <p>Secs</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DealsSection;
