"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ICounterData } from "@/interfaces/CounterData.interface";
import { useLocale } from "next-intl";

const Counter: React.FC = () => {
  const [counterData, setCounterData] = useState<ICounterData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const locale = useLocale();

  // Fetch Counter Data
  const fetchCounterData = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/edit-website/counter`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch counter data");
      const data = await res.json();
      setCounterData(data.data);
    } catch (error) {
      console.error("Error fetching counter data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Animate Numbers
  const animateNumber = useCallback(
    (
      selector: string,
      startValue: number,
      endValue: number,
      duration: number
    ) => {
      const element = document.querySelector(selector) as HTMLElement;
      if (!element) return;

      let startTime: number | null = null;

      const step = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = currentTime - startTime;
        const currentNumber = Math.min(
          Math.floor(
            (progress / duration) * (endValue - startValue) + startValue
          ),
          endValue
        );
        element.textContent = currentNumber.toLocaleString();

        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    },
    []
  );

  useEffect(() => {
    fetchCounterData();
  }, [fetchCounterData]);

  useEffect(() => {
    if (!isLoading && counterData.length > 0) {
      counterData[0].counters.forEach((counter, index: number) => {
        animateNumber(`.number-${index}`, 0, counter.value, 2000);
      });
    }
  }, [counterData, isLoading, animateNumber]);

  // Render Counter Box
  const renderCounterBox = (
    counter: { label: string; label_ar: string },
    index: number
  ) => (
    <div className="count-box" key={index}>
      <span className={`number-${index}`}>0</span>
      <span>+</span>
      <h5>{locale === "en" ? counter.label : counter.label_ar}</h5>
    </div>
  );

  return (
    <div className={`counter ${locale === "ar" ? "counter-ar" : ""}`}>
      <div className="container">
        <div className="row">
          {/* Image Section */}
          <div className="col-12 col-lg-3">
            <div className="count-yr">
              <Image
                src={
                  counterData[0]?.image
                    ? `${process.env.NEXT_PUBLIC_API_URL}/${counterData[0]?.image}`
                    : "/assets/images/OIP.jpg"
                }
                alt="Years"
                width={300}
                height={300}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Counter Section */}
          <div className="col-12 col-lg-9 m-auto">
            <div className="counter-sec">
              {counterData[0]?.counters?.map(renderCounterBox)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
