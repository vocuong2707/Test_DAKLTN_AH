'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLoadUserQuery } from '@/redux/features/api/apiSilce';
import CourseContent from '@/app/components/Course/CourseContent';
import Loader from '@/app/components/Loader/Loader';

interface CoursePageProps{
  params: {
    id: string;
  };
}

export default function CourseContentPage({ params }: CoursePageProps) {
  const router = useRouter();
  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data.user?.courses?.some((item: { _id: string }) => item._id === params.id);
      if (!isPurchased) {
        router.push('/');
      }
    }
    if (error) {
      router.push('/');
    }
  }, [data, error, params.id, router]);

  if (isLoading) {
    return <Loader />;
  }

  return data ? (
    <div>
      <CourseContent id={params.id} user={data.user} />
    </div>
  ) : null;
}
