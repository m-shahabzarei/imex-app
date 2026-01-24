"use client";
import Item from "@/component/panel/course/Item";
import { ICourse } from "@/component/panel/course/type";
import LoadingSpinner from "@/component/ui/Loading";
import { useCourse } from "@/hooks/useCourse";

function Course() {
  const { course, error, isLoading } = useCourse();

  console.log(error)

  return (
    <div>
      {isLoading ? <LoadingSpinner/> : 
      error ? <LoadingSpinner error={error}/> 
      :
       (
        <div className="grid lg:grid-cols-2 gap-7 items-center md:pb-4">
          {course?.results.map((item: ICourse) => {
            return (
              <Item
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                time={item.time}
                price={item.price}
                teacher={item.teacher}
                link={item.link}
                owner={item.owner}
                price_discount={item.price_discount}
                type={item.type}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Course;
