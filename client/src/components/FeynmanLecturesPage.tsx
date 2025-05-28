import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function FeynmanLecturesPage() {
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [readingMode, setReadingMode] = useState(false);

  const feynmanVolumes = [
    {
      id: "volume1",
      title: "Volume I: Mechanics, Radiation, and Heat",
      description: "The fundamental principles of physics - motion, forces, energy, and thermodynamics",
      color: "from-blue-500 to-cyan-500",
      chapters: [
        {
          id: "1-1",
          title: "Atoms in Motion",
          description: "All things are made of atoms - little particles that move around in perpetual motion, attracting each other when they are a little distance apart, but repelling upon being squeezed into one another.",
          topics: ["Atomic Theory", "States of Matter", "Molecular Motion"],
          duration: "45 min",
          difficulty: "Beginner",
          content: `
# Chapter 1-1: Atoms in Motion

*"If, in some cataclysm, all of scientific knowledge were to be destroyed, and only one sentence passed on to the next generations of creatures, what statement would contain the most information in the fewest words? I believe it is the atomic hypothesis (or the atomic fact, or whatever you wish to call it) that all things are made of atoms—little particles that move around in perpetual motion, attracting each other when they are a little distance apart, but repelling upon being squeezed into one another."*

## Introduction

This is our first venture into the world of physics. We begin with one of the most important concepts in all of science: the atomic theory of matter. This single idea, properly understood, contains an enormous amount of information about the world around us.

## The Atomic Hypothesis

Everything is made of atoms. This seems like a simple statement, but let us explore what it means. Atoms are extremely small particles, far too small to see with the naked eye or even with ordinary microscopes. Yet these tiny building blocks make up everything we see around us—the air we breathe, the water we drink, the food we eat, our own bodies.

### What Are Atoms Like?

Imagine atoms as tiny spheres, constantly in motion. They attract each other when they are a small distance apart, but if you try to squeeze them too close together, they repel each other strongly. This simple picture can explain an enormous number of phenomena.

## States of Matter

Let's consider water as an example. In ice, the water molecules (each made of two hydrogen atoms and one oxygen atom) are locked in a rigid pattern, vibrating in place but not moving around much. As we heat the ice, the molecules vibrate more and more until they break free from their rigid positions—the ice melts into liquid water.

In liquid water, the molecules are still close together and attracting each other, but they can slide past one another. They are in constant motion, jiggling and tumbling about.

If we heat the water further, the molecules move so fast that they overcome the attractive forces entirely and escape into the air as water vapor or steam. In this gaseous state, the molecules are flying around freely, only occasionally bumping into each other.

## Brownian Motion

One of the most beautiful demonstrations of atomic motion was discovered by the botanist Robert Brown in 1827. When he looked at tiny pollen grains suspended in water under a microscope, he saw them jiggling around in an irregular, never-ending dance.

This motion, now called Brownian motion, is caused by the water molecules constantly bombarding the pollen grains from all sides. Since the bombardment is random, sometimes more molecules hit one side than the other, causing the grain to move. This was one of the first direct pieces of evidence for the reality of atoms and their constant motion.

## Chemical Reactions

The atomic theory also explains chemical reactions. When we burn wood, for example, the complex molecules that make up the wood (mostly cellulose) combine with oxygen molecules from the air. The atoms rearrange themselves into new combinations—carbon dioxide and water vapor—which escape into the air. The atoms themselves are not destroyed; they simply form new partnerships.

## The Salt Crystal

Consider a crystal of salt. If we could see the individual atoms, we would find them arranged in a perfectly regular pattern: sodium atoms and chlorine atoms alternating in a three-dimensional checkerboard. The forces between these atoms hold the crystal together and give it its characteristic cubic shape.

When we dissolve salt in water, the water molecules surround the sodium and chlorine atoms and pull them away from the crystal structure. The atoms don't disappear—they're still there, just spread throughout the water instead of being locked in the crystal.

## Conclusion

The atomic hypothesis is the key that unlocks our understanding of the physical world. From this one idea—that matter is made of atoms in constant motion—we can understand phase changes, chemical reactions, the behavior of gases, and countless other phenomena.

In the words of Richard Feynman: "The world is a dynamic mess of jiggling things." This jiggling, this constant atomic motion, is the hidden reality behind all the apparent stillness and solidity of the world around us.

As we continue our study of physics, we will return again and again to this fundamental insight. Whether we are studying heat, pressure, chemical bonds, or the properties of materials, we will find that the behavior of atoms provides the underlying explanation.

Remember: everything is made of atoms, and atoms are always moving. From this simple truth flows much of our understanding of the natural world.
          `
        },
        {
          id: "1-2", 
          title: "Basic Physics",
          description: "What physics is about and how it relates to other sciences. The scientific method and the nature of physical laws.",
          topics: ["Scientific Method", "Physical Laws", "Measurement"],
          duration: "35 min",
          difficulty: "Beginner",
          content: `
# Chapter 1-2: Basic Physics

## Introduction

Physics is not just another subject to be learned; it is the most fundamental of the sciences. It seeks to understand how the world works at the deepest level. But what exactly is physics, and how does it relate to other fields of human knowledge?

## What Is Physics?

Physics is the study of the basic rules that govern the behavior of everything in the universe. These rules are often simple, but their consequences can be enormously complex. For instance, from the simple rule that like charges repel and unlike charges attract, we can understand the entire field of electricity and magnetism.

The remarkable thing about physics is that a few basic principles can explain an incredible variety of phenomena. The same gravitational force that makes an apple fall from a tree also keeps the planets in their orbits around the sun. The same electromagnetic forces that make your radio work are responsible for the chemical bonds that hold your body together.

## The Scientific Method

How do we discover these fundamental rules? We use what we call the scientific method. This is not a rigid recipe, but rather a way of thinking about the world that has proven remarkably successful.

First, we observe phenomena in nature. We notice patterns and regularities. For example, we might notice that objects always fall down, never up.

Second, we guess—we make a hypothesis about what might be causing what we observe. We might guess that there is some force pulling objects toward the earth.

Third, we compute the consequences of our guess. If our guess is correct, what else should we observe? If there really is a force pulling objects toward earth, then perhaps this same force affects the moon.

Fourth, we compare our computed consequences with further observations or experiments. We might look at the motion of the moon and see if it's consistent with our guess about gravity.

If our observations match our predictions, we gain confidence in our guess. If they don't match, we must modify our guess or abandon it entirely. This process never ends—we are always testing and refining our understanding.

## Physical Laws

The "rules" we discover through this process are called physical laws. But what do we mean by a "law" in physics?

A physical law is a statement about how nature behaves that appears to be true in all circumstances we have tested. For example, we have never observed energy being created or destroyed, only converted from one form to another. So we state the law of conservation of energy.

It's important to understand that these laws are not like human laws—they are not enforced by any authority. Rather, they are descriptions of how nature actually behaves. Nature doesn't "obey" the law of gravity; the law of gravity is simply our way of describing how objects with mass attract each other.

## Mathematics: The Language of Physics

To express physical laws precisely, we use mathematics. Mathematics allows us to make exact predictions, not just vague qualitative statements.

For instance, we don't just say "objects fall down." We say that the distance fallen by an object starting from rest is proportional to the square of the time: d = ½gt². This mathematical expression allows us to predict exactly where a falling object will be at any time.

Some people are intimidated by the mathematics in physics, but it's really just a language—a very precise language for describing relationships in nature. Once you learn to speak this language, you gain access to incredibly powerful and beautiful insights about the world.

## The Relationship to Other Sciences

Physics is often called the most fundamental science because all other sciences ultimately rest on physical principles.

Chemistry, for example, is really just physics applied to atoms and molecules. All chemical reactions involve the rearrangement of electrons around atomic nuclei, and these rearrangements follow the laws of quantum mechanics and electromagnetism.

Biology involves the study of living things, but living things are made of atoms and molecules that obey physical laws. The flow of blood through your arteries follows the laws of fluid dynamics. Your nerves conduct electrical signals according to the laws of electricity.

Even subjects that seem far removed from physics, like psychology and sociology, ultimately depend on physical processes in the brain and in human interactions.

## The Unity of Science

This interconnectedness reveals something profound: there is a deep unity underlying all of science. The same basic principles that govern the behavior of atoms also govern the behavior of stars. The same forces that hold the nucleus of an atom together (scaled up enormously) would be strong enough to lift a mountain.

This unity suggests that the universe is fundamentally comprehensible. We are not confronted with millions of separate, unrelated phenomena, but rather with different aspects of a single, unified reality governed by a relatively small number of basic principles.

## The Beauty of Physics

Many physicists are motivated not just by curiosity about how things work, but by the sheer beauty of the patterns they discover. There is something deeply aesthetic about the way the laws of physics fit together, the way complex phenomena emerge from simple rules.

Einstein once said that "the most incomprehensible thing about the universe is that it is comprehensible." The fact that we can understand the universe at all, that it follows mathematical laws that our minds can grasp, is perhaps the most remarkable discovery of all.

## Conclusion

Physics is the study of the fundamental patterns that underlie all natural phenomena. Through careful observation, creative guessing, and rigorous testing, we have discovered laws that govern everything from the smallest subatomic particles to the largest structures in the universe.

These laws are not just abstract mathematical formulas—they are the keys to understanding our world and our place in it. They reveal the deep unity and beauty of nature, and they provide the foundation for all other sciences.

As we continue our study of physics, we will see how these basic principles unfold into the rich tapestry of phenomena we observe around us every day.
          `
        },
        {
          id: "1-3",
          title: "The Relation of Physics to Other Sciences",
          description: "How physics connects to chemistry, biology, astronomy, geology, psychology, and other fields of human knowledge.",
          topics: ["Interdisciplinary Science", "Reductionism", "Emergence"],
          duration: "40 min",
          difficulty: "Beginner",
          content: `
# Chapter 1-3: The Relation of Physics to Other Sciences

## Introduction

Physics is often called the most fundamental of all sciences, but what does this really mean? How does physics relate to chemistry, biology, astronomy, geology, psychology, and other fields of human knowledge? Understanding these connections reveals the remarkable unity underlying all scientific knowledge.

## Physics and Chemistry

The relationship between physics and chemistry is perhaps the most obvious. Chemistry deals with atoms and molecules—their properties, how they combine, and how they react. But atoms and molecules are physical objects that obey physical laws.

All chemical properties can, in principle, be understood from the physics of electrons moving around atomic nuclei. The chemical bond is really just the electromagnetic force between charged particles. When sodium and chlorine combine to form salt, what's really happening is that an electron transfers from sodium to chlorine because this arrangement has lower energy—a purely physical phenomenon.

The periodic table of elements, one of chemistry's greatest organizing principles, emerges naturally from the quantum mechanical properties of electrons in atoms. The way electrons fill up energy levels determines which atoms will behave similarly, creating the patterns we see in Mendeleev's table.

Even chemical reactions follow physical principles. When hydrogen and oxygen combine to form water, the reaction releases energy because the final state has lower energy than the initial state. This is just the physical principle that systems tend toward their lowest energy configuration.

## Physics and Biology

Biology studies living things, but living things are made of atoms and molecules that obey physical laws. The more we understand about life, the more we see that biological phenomena are manifestations of physical principles.

Consider how your muscles work. When you decide to move your arm, electrical signals travel down your nerves. These signals are just ions moving through cell membranes—a process governed by electrical forces and diffusion, both physical phenomena.

Your heart is essentially a pump, and the flow of blood through your circulatory system follows the laws of fluid dynamics. The pressure drops and flow rates in your arteries and veins can be calculated using the same principles we use to analyze water flowing through pipes.

Even the way your eyes detect light involves physics. Photons hit molecules in your retina, causing them to change shape, which triggers electrical signals to your brain. Vision is really just applied optics and quantum mechanics.

At the cellular level, life depends on molecular machines—proteins that fold into specific shapes and perform specific functions. These protein machines follow the laws of thermodynamics and statistical mechanics, just like any other physical system.

## Physics and Astronomy

Astronomy and physics have been intertwined since ancient times. The same gravitational force that makes objects fall on Earth also keeps planets in orbit around the Sun and holds galaxies together.

When we look at stars, we're doing physics experiments on a cosmic scale. Stars are giant nuclear reactors, fusing hydrogen into helium and releasing enormous amounts of energy. Understanding stellar evolution requires knowledge of nuclear physics, thermodynamics, and fluid dynamics.

The light from distant stars tells us about their composition, temperature, and motion. Spectroscopy—the analysis of light—reveals that the same physical laws we observe on Earth apply throughout the universe. The hydrogen in distant galaxies emits light at exactly the same wavelengths as hydrogen in our laboratories.

Even more exotic astronomical phenomena, like black holes and neutron stars, are predicted by physical theories and help us test our understanding of gravity and matter under extreme conditions.

## Physics and Geology

The Earth itself is a complex physical system. Plate tectonics—the movement of continents—is driven by heat flow from the Earth's interior, following the laws of thermodynamics and fluid mechanics.

Mountain formation involves the physics of materials under stress. When rocks are compressed beyond their strength limits, they deform or fracture according to well-understood mechanical principles.

Earthquakes are the sudden release of stored elastic energy in rocks—a phenomenon that follows the same principles as a breaking guitar string or a snapping rubber band, just on a much larger scale.

Even the Earth's magnetic field is a physical phenomenon, generated by electrical currents in the molten iron core, governed by the laws of electromagnetism and fluid dynamics.

## Physics and Psychology

The connection between physics and psychology might seem less obvious, but it's real and important. All mental processes occur in the brain, which is a physical system made of neurons communicating through electrical and chemical signals.

When you remember something, physical changes occur in your brain—new connections form between neurons, or existing connections strengthen. Memory is not some mysterious mental phenomenon; it's the physics and chemistry of neural networks.

Even consciousness itself, though still not fully understood, must ultimately be explainable in terms of physical processes in the brain. This doesn't diminish the richness of human experience; it reveals the remarkable complexity that can emerge from physical systems.

## The Hierarchy of Sciences

This interconnectedness suggests a hierarchy in the sciences. Physics studies the most fundamental level—the basic rules governing all matter and energy. Chemistry emerges from physics when we consider how atoms combine. Biology emerges from chemistry when we study complex molecular systems. Psychology emerges from biology when we examine complex neural systems.

But this doesn't mean that higher-level sciences are "just" physics. Each level has its own patterns, principles, and useful ways of thinking. A psychologist doesn't need to think about quantum mechanics to understand human behavior, just as a biologist doesn't need to solve the Schrödinger equation to understand how genes work.

## Reductionism and Emergence

This leads us to two important concepts: reductionism and emergence.

Reductionism is the idea that complex phenomena can be understood by breaking them down into simpler parts. In principle, all of chemistry reduces to physics, all of biology reduces to chemistry, and so on.

But emergence is equally important. This is the idea that complex systems can exhibit properties and behaviors that aren't obvious from studying their individual parts. Water molecules are wet, even though individual hydrogen and oxygen atoms aren't. Consciousness emerges from neural activity, even though individual neurons aren't conscious.

Both perspectives are valuable. The reductionist view reveals the underlying unity of science and helps us understand how complex systems work. The emergent view helps us understand why new levels of description and analysis are useful and necessary.

## The Unity of Knowledge

What emerges from this survey is a remarkable picture: all of science forms a unified whole. The same basic physical principles that govern the behavior of atoms also govern the behavior of stars, living cells, and even human brains.

This doesn't mean that all sciences will eventually be replaced by physics. Each field has developed its own useful concepts, methods, and ways of thinking. But it does mean that there's a deep underlying unity to all natural phenomena.

## Conclusion

Physics provides the foundation for all other sciences because it describes the most fundamental level of reality—the basic rules that govern all matter and energy. Understanding these connections doesn't diminish other sciences; it reveals the magnificent coherence of the natural world.

As we continue our study of physics, we'll see how a relatively small number of basic principles can account for an incredible diversity of phenomena, from the smallest subatomic particles to the largest structures in the universe, from the simplest chemical reactions to the most complex biological processes.

This unity is one of the most beautiful discoveries of human civilization: the universe is comprehensible, and all its varied phenomena are expressions of a few fundamental principles that we can understand.
          `
        },
        {
          id: "1-4",
          title: "Conservation of Energy",
          description: "The great conservation principle - energy cannot be created or destroyed, only transformed from one form to another.",
          topics: ["Energy Conservation", "Kinetic Energy", "Potential Energy", "Work"],
          duration: "50 min",
          difficulty: "Intermediate",
          content: `
# Chapter 1-4: Conservation of Energy

## Introduction

Among all the principles of physics, few are as fundamental and far-reaching as the conservation of energy. This principle states that energy cannot be created or destroyed, only transformed from one form to another. This simple statement has profound implications for understanding everything from falling objects to the evolution of stars.

## What Is Energy?

Energy is one of those concepts that is easier to recognize than to define precisely. We know energy when we see it: a moving car has energy, a stretched spring has energy, a hot cup of coffee has energy. But what exactly is energy?

In physics, energy is defined as the capacity to do work. But this definition is somewhat circular, because work is defined in terms of energy. Perhaps it's better to think of energy as a number—a quantity that we can calculate for any physical system—that has the remarkable property that it never changes (in an isolated system).

## The Conservation Principle

The principle of conservation of energy states that in any isolated system, the total amount of energy remains constant. Energy can change from one form to another, but the total amount never increases or decreases.

This is one of the most powerful principles in all of physics. It means that we have a kind of "accounting system" for energy—we can track where energy goes, and we know that whatever energy we start with, we must end up with the same total amount.

## Forms of Energy

Energy comes in many forms. Let's explore the most important ones:

### Kinetic Energy

Kinetic energy is the energy of motion. Any object that is moving has kinetic energy. The faster it moves, the more kinetic energy it has. For an object of mass m moving with speed v, the kinetic energy is:

KE = ½mv²

This formula tells us that kinetic energy depends on both the mass of the object and the square of its speed. Doubling the speed quadruples the kinetic energy.

### Potential Energy

Potential energy is stored energy—energy that has the potential to be converted into other forms. The most familiar example is gravitational potential energy.

When you lift an object above the ground, you give it gravitational potential energy. This energy is "stored" in the object's position. If you release the object, this potential energy converts to kinetic energy as the object falls.

For an object of mass m at height h above the ground, the gravitational potential energy is:

PE = mgh

where g is the acceleration due to gravity.

### Other Forms of Energy

There are many other forms of energy:

- **Elastic potential energy**: Energy stored in compressed or stretched springs, rubber bands, etc.
- **Chemical energy**: Energy stored in chemical bonds, like the energy in gasoline or food
- **Thermal energy**: The kinetic energy of randomly moving atoms and molecules in a substance
- **Electrical energy**: Energy associated with electric charges and currents
- **Nuclear energy**: Energy stored in atomic nuclei
- **Rest mass energy**: The energy equivalent of mass itself, given by Einstein's E = mc²

## Conservation in Action

Let's see how energy conservation works in some simple examples:

### A Falling Object

Consider a ball dropped from a height h. Initially, the ball has potential energy mgh and no kinetic energy (since it starts at rest). As it falls:

- Potential energy decreases (as height decreases)
- Kinetic energy increases (as speed increases)
- Total energy remains constant: PE + KE = mgh

Just before hitting the ground, all the initial potential energy has converted to kinetic energy.

### A Pendulum

A pendulum beautifully demonstrates energy conservation. At the highest points of its swing, the pendulum has maximum potential energy and zero kinetic energy. At the bottom of the swing, it has maximum kinetic energy and minimum potential energy.

Throughout the motion, energy constantly transforms between kinetic and potential, but the total remains constant (ignoring friction).

### A Spring

When you compress a spring and release it, the stored elastic potential energy converts to kinetic energy of the moving mass attached to the spring. As the mass moves and stretches the spring on the other side, kinetic energy converts back to elastic potential energy.

## Work and Energy

Work is closely related to energy. When a force acts on an object and moves it through a distance, work is done. The work done equals the change in kinetic energy of the object.

If you push a box across the floor, you do work against friction. The energy you expend doesn't disappear—it converts to thermal energy, heating up the box and the floor slightly.

## Heat as Energy

One of the great insights of 19th-century physics was recognizing that heat is a form of energy. When you rub your hands together, the kinetic energy of the rubbing motion converts to thermal energy—your hands get warm.

This led to the first law of thermodynamics, which is simply conservation of energy applied to systems that can exchange heat with their surroundings.

## Mass-Energy Equivalence

Einstein's special theory of relativity revealed that mass itself is a form of energy. The famous equation E = mc² tells us that even a small amount of mass represents an enormous amount of energy.

This mass-energy equivalence explains how the sun shines: nuclear reactions in the sun's core convert a small amount of mass into energy, which eventually reaches us as sunlight.

## Why Is Energy Conserved?

The conservation of energy is related to a deep symmetry of nature. According to Noether's theorem, every symmetry in the laws of physics corresponds to a conservation law. Energy conservation corresponds to the fact that the laws of physics don't change with time—an experiment performed today gives the same results as the same experiment performed tomorrow.

## Practical Applications

Energy conservation is not just an abstract principle—it has enormous practical importance:

- **Engineering**: Engineers use energy conservation to design more efficient machines and systems
- **Environmental science**: Understanding energy flows helps us develop sustainable energy sources
- **Economics**: Energy conservation principles guide decisions about energy policy and resource allocation
- **Daily life**: Understanding energy helps us make informed choices about everything from car purchases to home heating

## Apparent Violations

Sometimes it might seem like energy is not conserved. A moving car eventually stops, seemingly losing all its kinetic energy. A hot cup of coffee cools down, apparently losing thermal energy.

But energy is still conserved in these cases—it's just transferred to the surroundings. The car's kinetic energy converts to heat in the brakes and tires. The coffee's thermal energy transfers to the surrounding air.

When we account for all forms of energy and all parts of the system (including the environment), energy is always conserved.

## Conclusion

The conservation of energy is one of the most powerful and beautiful principles in physics. It provides a unifying framework for understanding an enormous variety of phenomena, from the motion of planets to the operation of power plants.

This principle tells us that energy is never lost—it only changes form. In a universe governed by energy conservation, we have a kind of cosmic accounting system that always balances. Energy is the currency of the physical world, and like any good currency, it's neither created nor destroyed, only exchanged.

As we continue our study of physics, we'll see energy conservation at work in every branch of the subject. It's a thread that connects mechanics to thermodynamics, electricity to nuclear physics, and quantum mechanics to cosmology. Understanding energy conservation is key to understanding how the universe works.
          `
        },
        {
          id: "1-8",
          title: "Motion",
          description: "The description of motion - position, velocity, acceleration, and how they relate to each other mathematically.",
          topics: ["Kinematics", "Velocity", "Acceleration", "Derivatives"],
          duration: "55 min",
          difficulty: "Intermediate",
          content: `
# Chapter 1-8: Motion

## Introduction

Motion is everywhere around us. From the swing of a pendulum to the orbit of planets, from the flow of water to the dance of atoms, the universe is in constant motion. Understanding motion is fundamental to understanding physics, and it was one of the first phenomena that physicists learned to describe with mathematical precision.

## Position and Displacement

To describe motion, we first need to specify where an object is. Position tells us the location of an object in space, typically measured from some reference point or origin.

When an object moves from one position to another, we say it has undergone a displacement. Displacement is not just the distance traveled—it's the change in position, taking into account both the magnitude and direction of the movement.

For example, if you walk 10 meters east, then 10 meters west, your displacement is zero (you're back where you started), even though you've traveled a total distance of 20 meters.

## Velocity: The Rate of Change of Position

Velocity describes how quickly position changes with time. It's not just speed—velocity is speed with a direction.

Average velocity is defined as the displacement divided by the time taken:
v_avg = Δx / Δt

But this average doesn't tell us what's happening at any particular instant. For that, we need instantaneous velocity—the velocity at a specific moment in time.

Instantaneous velocity is the limit of average velocity as the time interval approaches zero. In mathematical terms, it's the derivative of position with respect to time:
v = dx/dt

This is one of the first places where calculus becomes essential in physics.

## Acceleration: The Rate of Change of Velocity

Just as velocity describes how position changes, acceleration describes how velocity changes with time.

Average acceleration is the change in velocity divided by the time taken:
a_avg = Δv / Δt

Instantaneous acceleration is the derivative of velocity with respect to time:
a = dv/dt = d²x/dt²

Acceleration can be positive (speeding up in the positive direction), negative (slowing down), or even sideways (changing direction at constant speed).

## The Mathematics of Motion

The mathematical relationships between position, velocity, and acceleration form the foundation of kinematics—the description of motion without considering its causes.

If we know the acceleration as a function of time, we can find velocity by integration:
v(t) = v₀ + ∫a(t)dt

And if we know velocity as a function of time, we can find position:
x(t) = x₀ + ∫v(t)dt

For the special case of constant acceleration, these relationships simplify to the familiar kinematic equations:
- v = v₀ + at
- x = x₀ + v₀t + ½at²
- v² = v₀² + 2a(x - x₀)

## Examples of Motion

### Free Fall

When you drop an object (ignoring air resistance), it falls with constant acceleration g ≈ 9.8 m/s² downward. This is one of the simplest examples of motion with constant acceleration.

Starting from rest at height h, the object's velocity when it hits the ground is v = √(2gh), and it takes time t = √(2h/g) to fall.

### Projectile Motion

When you throw a ball, it follows a curved path called a parabola. This motion can be understood by breaking it into horizontal and vertical components:
- Horizontal motion: constant velocity (no acceleration)
- Vertical motion: constant acceleration due to gravity

The combination of these two motions produces the characteristic parabolic trajectory.

### Circular Motion

An object moving in a circle at constant speed still has acceleration—not because its speed is changing, but because its direction is changing. This centripetal acceleration always points toward the center of the circle and has magnitude:
a = v²/r

where v is the speed and r is the radius of the circle.

## Relative Motion

Motion is always relative—we must always specify "motion relative to what?" A passenger walking forward in a moving train has different velocities relative to the train and relative to the ground.

If object A moves with velocity v_A relative to reference frame B, and B moves with velocity v_B relative to frame C, then A's velocity relative to C is:
v_AC = v_AB + v_BC

This principle of relativity becomes more complex at very high speeds, leading to Einstein's special theory of relativity.

## Motion in Three Dimensions

Real motion occurs in three-dimensional space. We can describe this using vectors—quantities that have both magnitude and direction.

Position, velocity, and acceleration are all vector quantities. In three dimensions:
- Position: r = (x, y, z)
- Velocity: v = dr/dt = (dx/dt, dy/dt, dz/dt)
- Acceleration: a = dv/dt = (d²x/dt², d²y/dt², d²z/dt²)

## The Concept of Derivatives

The relationship between position, velocity, and acceleration introduces us to one of mathematics' most powerful tools: the derivative.

The derivative represents the rate of change of one quantity with respect to another. In physics, we often want to know how things change with time, so time derivatives are especially important.

The derivative connects the abstract world of mathematics with the physical world of motion. When Galileo first studied falling objects, he was unknowingly developing the concepts that would later become calculus.

## Historical Perspective

The study of motion has a rich history. Aristotle believed that heavy objects fall faster than light ones—a reasonable guess, but wrong. Galileo showed through experiment that all objects fall at the same rate (in the absence of air resistance).

Newton built on Galileo's work to develop a complete mathematical description of motion. Newton's laws, which we'll study in the next chapter, explain not just how objects move, but why they move as they do.

## Modern Applications

Understanding motion is crucial for countless modern applications:
- **GPS systems** must account for the motion of satellites and the effects of relativity
- **Computer animation** uses physics simulations to create realistic motion
- **Sports science** analyzes the motion of athletes to improve performance
- **Traffic engineering** models the flow of vehicles to optimize traffic patterns

## Conclusion

Motion is the most basic phenomenon in physics, yet describing it precisely requires sophisticated mathematics. The concepts of position, velocity, and acceleration, and their relationships through calculus, provide the foundation for all of mechanics.

What's remarkable is that these same mathematical tools—originally developed to describe falling stones and planetary orbits—now help us understand everything from the motion of electrons in atoms to the expansion of the universe itself.

The study of motion reveals one of physics' great insights: behind the complexity of the natural world lie simple, elegant mathematical relationships that we can discover and understand.
          `
        },
        {
          id: "1-9",
          title: "Newton's Laws of Dynamics",
          description: "The three fundamental laws that govern all motion in the classical world, from falling apples to orbiting planets.",
          topics: ["Newton's Laws", "Force", "Mass", "Inertia"],
          duration: "60 min",
          difficulty: "Intermediate",
          content: `
# Chapter 1-9: Newton's Laws of Dynamics

## Introduction

In our previous study of motion, we learned to describe how objects move—their position, velocity, and acceleration. But we haven't yet addressed the fundamental question: what causes motion? This question leads us to dynamics, the study of the relationship between forces and motion.

Isaac Newton, in his masterwork "Principia Mathematica" published in 1687, gave us three laws that completely describe the relationship between forces and motion. These laws are so fundamental that they govern everything from the motion of atoms to the orbits of galaxies.

## Newton's First Law: The Law of Inertia

*"Every object persists in its state of rest or uniform motion in a straight line unless it is compelled to change that state by forces impressed upon it."*

This law tells us that objects have a natural tendency to maintain their current state of motion. This property is called inertia.

### Understanding Inertia

If you're sitting in a car that suddenly stops, your body continues moving forward—not because of some mysterious force pushing you, but because of inertia. Your body tends to maintain its state of motion.

Similarly, if no forces act on a moving object in space, it will continue moving in a straight line at constant speed forever. This is why spacecraft can coast through space without their engines running.

### The Concept of Force

The First Law also introduces the concept of force. A force is what's needed to change an object's state of motion. If something is speeding up, slowing down, or changing direction, we know a force must be acting on it.

Forces are vector quantities—they have both magnitude and direction. Common examples include:
- Gravitational force (always attractive, always downward near Earth's surface)
- Normal force (the push of a surface against an object in contact with it)
- Friction force (opposes relative motion between surfaces)
- Tension force (the pull of a rope or string)

## Newton's Second Law: F = ma

*"The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass."*

Mathematically: F = ma

where F is the net force, m is the mass, and a is the acceleration.

### Understanding the Second Law

This law quantifies the relationship between force, mass, and acceleration:

- **More force produces more acceleration**: Push harder on a box, and it speeds up more quickly.
- **More mass produces less acceleration**: A heavy box is harder to accelerate than a light one with the same force.
- **Force and acceleration are in the same direction**: Push east, and the object accelerates east.

### Mass vs. Weight

It's important to distinguish between mass and weight:
- **Mass** is a measure of how much matter an object contains. It's the same everywhere in the universe.
- **Weight** is the gravitational force acting on an object. On Earth, weight = mg, where g ≈ 9.8 m/s².

Your mass is the same on Earth and on the Moon, but your weight on the Moon is only about 1/6 of your weight on Earth because the Moon's gravitational field is weaker.

### Applications of the Second Law

The Second Law allows us to solve a wide variety of problems:

**Example 1**: A 1000 kg car accelerates at 2 m/s². What's the net force?
F = ma = (1000 kg)(2 m/s²) = 2000 N

**Example 2**: A 50 N force acts on a 10 kg object. What's its acceleration?
a = F/m = 50 N / 10 kg = 5 m/s²

## Newton's Third Law: Action and Reaction

*"For every action, there is an equal and opposite reaction."*

More precisely: When object A exerts a force on object B, object B simultaneously exerts an equal and opposite force on object A.

### Understanding the Third Law

This law is often misunderstood. It doesn't mean that forces cancel out—the action and reaction forces act on different objects.

**Examples**:
- When you walk, you push backward on the ground (action), and the ground pushes forward on you (reaction). This forward force from the ground is what propels you forward.
- When you sit in a chair, gravity pulls you down (action), and the chair pushes up on you (reaction).
- A rocket works by pushing hot gases downward (action), and the gases push the rocket upward (reaction).

### Why Don't Action-Reaction Pairs Cancel?

Since action-reaction forces are equal and opposite, why don't they cancel out? The key is that they act on different objects. Forces only cancel when they act on the same object.

## Applying Newton's Laws

To solve problems using Newton's laws, we typically follow these steps:

1. **Identify the object** whose motion we want to analyze
2. **Draw a free-body diagram** showing all forces acting on that object
3. **Apply Newton's Second Law**: ΣF = ma
4. **Solve for the unknown**

### Free-Body Diagrams

A free-body diagram shows an object as a point with arrows representing all the forces acting on it. This visual tool helps us organize our thinking and avoid mistakes.

### Example Problem

A 10 kg box sits on a table. You push it with a horizontal force of 50 N, and friction opposes the motion with a force of 20 N. What's the box's acceleration?

**Solution**:
- Net horizontal force: F_net = 50 N - 20 N = 30 N
- Using F = ma: 30 N = (10 kg) × a
- Therefore: a = 3 m/s²

## Applications of Newton's Laws

Newton's laws apply to an enormous range of phenomena:

### Planetary Motion

Newton showed that the same laws governing falling apples also govern planetary orbits. The gravitational force provides the centripetal force needed to keep planets in their elliptical orbits around the Sun.

### Engineering

Engineers use Newton's laws to design everything from bridges to spacecraft. When designing a bridge, they must ensure that the forces are balanced so the structure doesn't accelerate (and therefore doesn't collapse).

### Sports

Understanding Newton's laws helps athletes optimize their performance:
- Runners push backward against the track to propel themselves forward
- Swimmers push water backward to move forward
- High jumpers use Newton's laws to maximize their height

## Limitations of Newton's Laws

While Newton's laws are incredibly successful, they do have limitations:

1. **Very high speeds**: Near the speed of light, we need Einstein's special relativity
2. **Very small scales**: At the atomic level, we need quantum mechanics
3. **Very strong gravitational fields**: Near black holes, we need general relativity

For everyday situations—from molecules to planets—Newton's laws work perfectly.

## The Profound Impact of Newton's Laws

Newton's laws represented a revolutionary breakthrough in human understanding. For the first time, the motion of earthly and heavenly objects could be understood using the same principles. This unification was one of the greatest intellectual achievements in history.

These laws also established the power of mathematical physics. By expressing the laws of nature as mathematical equations, Newton showed that we could make precise, quantitative predictions about the natural world.

## Conclusion

Newton's three laws of motion form the foundation of classical mechanics. They tell us:

1. Objects resist changes in motion (inertia)
2. Force causes acceleration proportional to mass (F = ma)
3. Forces always come in equal and opposite pairs

These simple statements explain an enormous range of phenomena and provide the tools to solve countless practical problems. From the design of automobiles to the navigation of spacecraft, Newton's laws continue to be essential tools for understanding and predicting motion.

What's most remarkable is that these laws, formulated over 300 years ago, remain as accurate and useful today as when Newton first wrote them. They represent one of humanity's greatest insights into the workings of the natural world.
          `
        },
        {
          id: "1-10",
          title: "Conservation of Momentum",
          description: "Another great conservation law - the total momentum of an isolated system remains constant over time.",
          topics: ["Momentum", "Impulse", "Collisions", "Conservation Laws"],
          duration: "45 min",
          difficulty: "Intermediate",
          content: `
# Chapter 1-10: Conservation of Momentum

## Introduction

We've already seen how powerful conservation laws can be, particularly conservation of energy. Now we encounter another fundamental conservation law that's equally important: conservation of momentum. This principle governs everything from collisions between billiard balls to the recoil of rockets, and it provides insights into the fundamental nature of space and motion.

## What Is Momentum?

Momentum is defined as the product of an object's mass and velocity:

p = mv

where p represents momentum, m is mass, and v is velocity.

Momentum is a vector quantity—it has both magnitude and direction. The direction of momentum is the same as the direction of velocity.

### Why Is Momentum Important?

Momentum captures something essential about moving objects that neither mass nor velocity alone can express. A massive truck moving slowly might have the same momentum as a small car moving fast. In collisions and interactions, it's momentum—not just mass or velocity—that determines what happens.

## The Principle of Conservation of Momentum

The law of conservation of momentum states:

*In any isolated system (one with no external forces), the total momentum remains constant.*

Mathematically, if we have a system of objects with initial momenta p₁ᵢ, p₂ᵢ, p₃ᵢ, etc., and final momenta p₁f, p₂f, p₃f, etc., then:

p₁ᵢ + p₂ᵢ + p₃ᵢ + ... = p₁f + p₂f + p₃f + ...

The total momentum before any interaction equals the total momentum after.

## Newton's Laws and Momentum

Conservation of momentum is actually a consequence of Newton's laws. From Newton's second law:

F = ma = m(dv/dt) = dp/dt

This tells us that force equals the rate of change of momentum.

From Newton's third law, we know that when two objects interact, the forces they exert on each other are equal and opposite. This means the momentum gained by one object equals the momentum lost by the other—total momentum is conserved.

## Impulse and Momentum

The impulse-momentum theorem connects force and momentum:

Impulse = Change in momentum
FΔt = Δp = mΔv

This relationship helps us understand why:
- Airbags save lives by extending collision time (reducing force)
- Boxers "roll with the punch" to reduce impact
- Long jumpers bend their knees when landing

## Collisions

Collisions provide excellent examples of momentum conservation. There are two main types:

### Elastic Collisions

In elastic collisions, both momentum and kinetic energy are conserved. Examples include:
- Collisions between billiard balls
- Molecular collisions in gases
- Some atomic and subatomic interactions

**Example**: Two identical masses approach each other with equal and opposite velocities. After collision, they bounce back with their velocities reversed.

### Inelastic Collisions

In inelastic collisions, momentum is conserved but kinetic energy is not. Some kinetic energy converts to heat, sound, or deformation energy.

**Perfectly Inelastic Collisions**: The objects stick together after collision. Examples include:
- A bullet embedding in a block of wood
- Two cars colliding and crumpling together
- Clay balls colliding and sticking

**Example**: A 1000 kg car moving at 20 m/s collides with a stationary 1500 kg truck. They stick together. What's their combined velocity?

Before: p = (1000 kg)(20 m/s) + (1500 kg)(0) = 20,000 kg⋅m/s
After: p = (1000 + 1500) kg × v = 2500 kg × v

By conservation: 20,000 = 2500v
Therefore: v = 8 m/s

## Applications of Momentum Conservation

### Rocket Propulsion

Rockets work by conservation of momentum. They expel hot gases at high speed in one direction, causing the rocket to gain momentum in the opposite direction.

The rocket equation, derived from momentum conservation, tells us how much velocity a rocket can gain based on the mass of fuel it burns and the speed of the exhaust.

### Recoil

When you fire a gun, the bullet gains momentum in one direction, and you (and the gun) gain equal momentum in the opposite direction. This is why guns "kick" when fired.

### Center of Mass

The center of mass of a system moves as if all the mass were concentrated at that point and only external forces acted on it. For an isolated system, the center of mass moves at constant velocity (or remains at rest).

This principle explains why:
- A firecracker exploding in space has fragments that spread out, but their center of mass continues in a straight line
- A person can't change their overall trajectory while in free fall, no matter how they move their arms and legs

## Momentum in Multiple Dimensions

Momentum conservation applies in all three dimensions simultaneously. In a two-dimensional collision:
- x-component of momentum is conserved: p₁ₓᵢ + p₂ₓᵢ = p₁ₓf + p₂ₓf
- y-component of momentum is conserved: p₁ᵧᵢ + p₂ᵧᵢ = p₁ᵧf + p₂ᵧf

This allows us to analyze complex collisions and interactions.

## Angular Momentum

Just as linear momentum is conserved, there's also conservation of angular momentum for rotating systems. Angular momentum L = Iω, where I is moment of inertia and ω is angular velocity.

Examples of angular momentum conservation:
- A figure skater spinning faster when pulling in their arms
- Planets maintaining their orbital motion
- The precession of gyroscopes

## Fundamental Significance

Momentum conservation is related to the symmetry of space itself. According to Noether's theorem, conservation of momentum arises from the fact that the laws of physics are the same everywhere in space—there's no special "preferred" location in the universe.

This deep connection between symmetries and conservation laws reveals something profound about the structure of physical law.

## Quantum Mechanics and Momentum

In quantum mechanics, momentum remains an important concept, though it takes on new characteristics:
- Particles have wave-particle duality
- The uncertainty principle relates position and momentum
- Momentum is still conserved in all interactions

Even at the quantum level, momentum conservation remains a fundamental principle.

## Problem-Solving with Momentum Conservation

When solving momentum problems:

1. **Identify the system** and determine if it's isolated
2. **Choose a coordinate system**
3. **Apply conservation of momentum** in each direction
4. **Set up equations**: initial momentum = final momentum
5. **Solve for unknowns**

Remember: momentum is conserved even when kinetic energy is not.

## Conclusion

Conservation of momentum is one of the most fundamental and useful principles in physics. It applies to all interactions, from the smallest subatomic collisions to the largest cosmic events.

This conservation law reveals something deep about the nature of the universe: there are certain quantities that remain constant even as everything around us changes. Momentum joins energy as one of these precious conserved quantities that provide order and predictability in an otherwise complex world.

Understanding momentum conservation not only helps us solve practical problems—from car crashes to rocket launches—but also gives us insight into the fundamental symmetries that govern the behavior of matter and energy throughout the universe.
          `
        }
      ]
    },
    {
      id: "volume2",
      title: "Volume II: The Electromagnetic Field",
      description: "Electricity, magnetism, and the electromagnetic field - the foundation of modern technology",
      color: "from-yellow-500 to-orange-500",
      chapters: [
        {
          id: "2-1",
          title: "Electrostatics",
          description: "The study of electric charges at rest - Coulomb's law, electric fields, and the principles that govern static electricity.",
          topics: ["Electric Charge", "Coulomb's Law", "Electric Field", "Gauss's Law"],
          duration: "50 min",
          difficulty: "Intermediate"
        },
        {
          id: "2-2",
          title: "The Electric Field",
          description: "A revolutionary concept - the idea that charges create fields in space that can exert forces on other charges.",
          topics: ["Field Concept", "Field Lines", "Superposition", "Point Charges"],
          duration: "45 min",
          difficulty: "Intermediate"
        },
        {
          id: "2-4",
          title: "Electrostatic Energy",
          description: "The energy stored in electric fields and how it relates to the work needed to assemble configurations of charges.",
          topics: ["Electric Potential Energy", "Energy Density", "Capacitors", "Field Energy"],
          duration: "55 min",
          difficulty: "Advanced"
        },
        {
          id: "2-13",
          title: "Magnetostatics",
          description: "Magnetic fields produced by steady currents - the magnetic analog of electrostatics.",
          topics: ["Magnetic Field", "Current Sources", "Ampère's Law", "Magnetic Dipoles"],
          duration: "50 min",
          difficulty: "Advanced"
        },
        {
          id: "2-18",
          title: "The Maxwell Equations",
          description: "The four equations that describe all of electromagnetism - arguably the most beautiful equations in physics.",
          topics: ["Maxwell's Equations", "Electromagnetic Waves", "Light", "Field Unification"],
          duration: "70 min",
          difficulty: "Advanced"
        }
      ]
    },
    {
      id: "volume3",
      title: "Volume III: Quantum Mechanics", 
      description: "The strange and wonderful world of quantum physics - where particles behave like waves",
      color: "from-purple-500 to-pink-500",
      chapters: [
        {
          id: "3-1",
          title: "Quantum Behavior",
          description: "The mysterious behavior of matter and light at the atomic scale - the double-slit experiment and wave-particle duality.",
          topics: ["Wave-Particle Duality", "Double-Slit Experiment", "Probability", "Quantum Superposition"],
          duration: "60 min",
          difficulty: "Advanced"
        },
        {
          id: "3-2",
          title: "The Relation of Wave and Particle Viewpoints",
          description: "How to reconcile the seemingly contradictory wave and particle descriptions of quantum objects.",
          topics: ["Complementarity", "De Broglie Waves", "Uncertainty Principle", "Wave Functions"],
          duration: "55 min",
          difficulty: "Advanced"
        },
        {
          id: "3-3",
          title: "Probability Amplitudes",
          description: "The heart of quantum mechanics - complex probability amplitudes that determine the likelihood of quantum events.",
          topics: ["Probability Amplitudes", "Complex Numbers", "Interference", "Quantum States"],
          duration: "65 min",
          difficulty: "Advanced"
        },
        {
          id: "3-8",
          title: "The Hamiltonian Matrix",
          description: "How energy and time evolution work in quantum mechanics - the Schrödinger equation in matrix form.",
          topics: ["Hamiltonian", "Energy Eigenstates", "Time Evolution", "Matrix Mechanics"],
          duration: "70 min",
          difficulty: "Expert"
        },
        {
          id: "3-11",
          title: "More Two-State Systems",
          description: "Simple quantum systems with just two possible states - the building blocks for understanding quantum computation.",
          topics: ["Two-Level Systems", "Spin", "Polarization", "Quantum Bits"],
          duration: "50 min",
          difficulty: "Advanced"
        }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800 border-green-300";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Advanced": return "bg-orange-100 text-orange-800 border-orange-300";
      case "Expert": return "bg-red-100 text-red-800 border-red-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-12">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xl sm:text-2xl">🎓</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                The Feynman Lectures on Physics
              </h1>
              <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
                "If you want to learn about nature, to appreciate nature, it is necessary to understand the language that she speaks in."
              </p>
            </div>
          </div>
          
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              These lectures by Nobel Prize winner <strong>Richard Feynman</strong> are considered among the finest physics 
              textbooks ever written. Originally delivered at Caltech from 1961-1963, they present physics with 
              unmatched clarity, insight, and infectious enthusiasm for understanding the natural world.
            </p>
          </div>
        </div>

        {/* Volume Tabs */}
        <Tabs defaultValue="volume1" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8 h-12 sm:h-14 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <TabsTrigger value="volume1" className="text-xs sm:text-sm font-medium">
              📚 Volume I
            </TabsTrigger>
            <TabsTrigger value="volume2" className="text-xs sm:text-sm font-medium">
              ⚡ Volume II
            </TabsTrigger>
            <TabsTrigger value="volume3" className="text-xs sm:text-sm font-medium">
              🔬 Volume III
            </TabsTrigger>
          </TabsList>

          {feynmanVolumes.map((volume) => (
            <TabsContent key={volume.id} value={volume.id} className="space-y-4 sm:space-y-6">
              {/* Volume Header */}
              <div className={`bg-gradient-to-r ${volume.color} rounded-2xl p-4 sm:p-8 text-white shadow-2xl`}>
                <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3">{volume.title}</h2>
                <p className="text-sm sm:text-lg opacity-90 max-w-3xl">{volume.description}</p>
                <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {volume.chapters.length} Chapters
                  </Badge>
                  <Button 
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    onClick={() => window.open('https://feynmanlectures.caltech.edu/', '_blank')}
                  >
                    📖 Read on Caltech Site
                  </Button>
                </div>
              </div>

              {/* Chapters Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {volume.chapters.map((chapter) => (
                  <Card 
                    key={chapter.id} 
                    className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50"
                  >
                    <CardHeader className="pb-3 sm:pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="text-xs font-mono">
                          Chapter {chapter.id}
                        </Badge>
                        <Badge className={`text-xs ${getDifficultyColor(chapter.difficulty)}`}>
                          {chapter.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-sm sm:text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {chapter.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-3 sm:space-y-4">
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {chapter.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                        <span>⏱️ {chapter.duration}</span>
                        <span>•</span>
                        <span>📚 Interactive</span>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-xs sm:text-sm">Key Topics:</h4>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {chapter.topics.map((topic, idx) => (
                            <Badge 
                              key={idx} 
                              variant="outline" 
                              className="text-[10px] sm:text-xs bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
                            >
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          className="flex-1 text-xs sm:text-sm bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                          onClick={() => {
                            setSelectedChapter(chapter.id);
                            setReadingMode(true);
                          }}
                        >
                          📖 Read Chapter
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs sm:text-sm"
                          onClick={() => setSelectedChapter(selectedChapter === chapter.id ? null : chapter.id)}
                        >
                          {selectedChapter === chapter.id ? '🔽' : 'ℹ️'}
                        </Button>
                      </div>
                      
                      {selectedChapter === chapter.id && !readingMode && (
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                          <h5 className="font-semibold text-sm mb-2">Chapter Summary:</h5>
                          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-3">
                            {chapter.description}
                          </p>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            <strong>Key Topics Covered:</strong>
                            <ul className="mt-2 space-y-1 ml-4">
                              {chapter.topics.map((topic, idx) => (
                                <li key={idx}>• {topic}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Reading Mode Modal */}
        {readingMode && selectedChapter && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Reader Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-heading font-bold">
                      {feynmanVolumes.flatMap(v => v.chapters).find(ch => ch.id === selectedChapter)?.title}
                    </h2>
                    <p className="text-sm opacity-90">
                      The Feynman Lectures on Physics
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setReadingMode(false);
                      setSelectedChapter(null);
                    }}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    ✕ Close
                  </Button>
                </div>
              </div>

              {/* Reader Content */}
              <ScrollArea className="h-[calc(90vh-120px)]">
                <div className="p-6 sm:p-8">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {feynmanVolumes.flatMap(v => v.chapters).find(ch => ch.id === selectedChapter)?.content?.split('\n').map((line, idx) => {
                      if (line.startsWith('# ')) {
                        return <h1 key={idx} className="font-heading text-3xl font-bold text-gray-900 dark:text-white mb-6">{line.substring(2)}</h1>;
                      } else if (line.startsWith('## ')) {
                        return <h2 key={idx} className="font-heading text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">{line.substring(3)}</h2>;
                      } else if (line.startsWith('### ')) {
                        return <h3 key={idx} className="font-heading text-xl font-medium text-gray-700 dark:text-gray-300 mt-6 mb-3">{line.substring(4)}</h3>;
                      } else if (line.startsWith('*') && line.endsWith('*')) {
                        return <p key={idx} className="italic text-gray-600 dark:text-gray-400 my-4 pl-4 border-l-4 border-blue-200 dark:border-blue-800">{line.substring(1, line.length - 1)}</p>;
                      } else if (line.trim() === '') {
                        return <div key={idx} className="my-4"></div>;
                      } else {
                        return <p key={idx} className="text-gray-700 dark:text-gray-300 leading-relaxed my-3">{line}</p>;
                      }
                    })}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        )}

        {/* Quote Section */}
        <div className="mt-8 sm:mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <blockquote className="text-lg sm:text-xl italic text-gray-700 dark:text-gray-300 mb-4">
              "I learned very early the difference between knowing the name of something and knowing something."
            </blockquote>
            <cite className="text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400">
              — Richard P. Feynman
            </cite>
          </div>
        </div>
      </div>
    </div>
  );
}