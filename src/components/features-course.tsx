/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

type Props = {
  courses: any[];
}

const FeaturesCourse = ({ courses }: Props) => {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full grow sm:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-lg)">
        <h2 className="text-center font-heading text-4xl leading-[1.1] uppercase sm:text-5xl">
          หลักสูตรทั้งหมด
        </h2>
        <p className="mt-3 text-center font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
          No complex configs. Just copy, paste, and start building
        </p>
        <div className="mt-14 grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              className="flex w-full flex-col border-[3px] border-black bg-card p-6"
              key={course.title}
            >
              <div className="relative aspect-4/5 w-full overflow-hidden border-[3px] border-black bg-muted">
                <Image
                  alt={course.title}
                  className="size-full object-cover"
                  width={0}
                  height={0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={course.picture}
                  loading="eager"
                />
              </div>
              <h3 className="mt-5 font-heading text-xl leading-tight uppercase">
                {course.title}
              </h3>
              <p className="mt-3 max-w-[30ch] text-base leading-[1.6] text-muted-foreground">
                {course.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesCourse;