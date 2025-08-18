/* eslint-disable @next/next/no-img-element */
import { dummyInterviews } from '@/constants';
import React from 'react';
import InterviewCard from '../components/InterviewCard';
import { Button } from '@/components/ui/button'; // ✅ From ShadCN or your UI library
import Link from 'next/link';

const Page = () => {
  return (
    <>
      <section className="card-cta mt-12">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice and Feedback</h2>
          <p className="text-lg">
            Practice on real interview questions & get instant feedback.
          </p>
          
          {/* ✅ Correct use of asChild with ShadCN Button */}
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start An Interview</Link>
          </Button>
        </div>

        <img
          src="/robot.png"
          alt="robo-dude"
          className="max-sm:hidden"
          width={300}
          height={300}
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Page;
