import featAi from "@/assets/one.png";
import featGps from "@/assets/two.png";
import featMock from "@/assets/three.png";
import featInstructor from "@/assets/four.png";
import featFleet from "@/assets/five.png";
import featProgress from "@/assets/six.png";

const features = [
  { img: featAi, icon: "🤖", title: "AI Smart Scheduling", desc: "Our AI matches you with the best instructor based on skill, location, and availability." },
  { img: featGps, icon: "📍", title: "Live GPS Tracking", desc: "Real-time route monitoring for students and parents during every session." },
  { img: featMock, icon: "📝", title: "Virtual Mock Tests", desc: "Practice RTO-style tests with instant scoring and performance analytics." },
  { img: featInstructor, icon: "👨‍🏫", title: "Expert Instructors", desc: "Certified, background-verified instructors rated by thousands of students." },
  { img: featFleet, icon: "🚗", title: "Modern Fleet", desc: "Well-maintained cars and scooties with dual controls for safe learning." },
  { img: featProgress, icon: "📊", title: "Progress Tracking", desc: "Gamified XP system, skill radar charts, and test-readiness predictions." },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Everything You Need to <span className="text-primary glow-text">Succeed</span>
          </h2>
          <p className="text-muted-foreground text-lg">Cutting-edge tools designed for modern learner drivers</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="card-surface overflow-hidden group hover:border-primary/50 transition-all hover:-translate-y-1 duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={f.img}
                  alt={f.title}
                  loading="lazy"
                  width={768}
                  height={512}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="text-xl font-display font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
