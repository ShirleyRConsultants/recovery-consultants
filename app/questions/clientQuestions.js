

 const clientQuestions = {

"sobriety" : {
    "Q": "Which statement best describes your SOBRIETY currently?",
    1: "I’m drinking and/or using drugs 5-7 days/week",
    2: "I’m drinking and/or using drugs 1-4 times/month",
    3: "I’m not drinking and/or using drugs, and having pretty intense cravings",
    4:"I’m not drinking and/or using drugs, and learning to accept the new normal",
    5:"I’m not drinking and/or using drugs, and feel pretty solid about my sobriety"
}
,
"nutrition" : {
    "Q":"Which statement best describes your FOOD + NUTRITION currently?",
    1: "I’m focused on staying sober/stabilizing, and I can’t even think about this right now",
    2:"I’m consuming a lot of sugar (sodas, candy, sweets) just trying to make it through the day",
    3:"I’m bringing in more awareness to what I’m eating",
    4:"I have a desire to eat more nutrient-rich foods (fruits, vegetables, leafy greens, etc.)",
    5:"I have incorporated a balanced diet and feel good about what I put in my body",

}
,
 "purpose" : {
    "Q":"Which statement best describes your PURPOSE currently?",
    1:"I feel so lost, overwhelmed, and hopeless by the concept of “purpose” or anything about the future",
    2:"I feel dissatisfied with my life",
    3:"I’m working on putting things in place",
    4:"I’m employed/in school/volunteering",
    5:"I feel very satisfied in my life and feel like I’m living my purpose",
}
,
"sleep" : {
    "Q":"Which statement best describes your SLEEP currently?",
    1:"I’m getting less than 4 hours of sleep/night",
    2:"I have trouble falling/staying asleep",
    3:"I’m getting close to 6 hours of sleep/night",
    4:"I feel pretty sleepy and tired most days",
    5:"I’m sleeping at least 8 hours/night and feel well-rested",
}
,
"anxiety" : {
    "Q":"Which statement best describes your ANXIETY currently?",
    1:"I feel ruled by my anxiety all day, everyday",
    2:"I spend more than 80% of my time overwhelmed and anxious about things",
    3:"I spend about 50% of my time feeling anxious about things",
    4:"I find myself trying to control things I can't control",
    5:"I am aware of my anxiety, but keep it at bay by using tools (breathing, being in the present moment, distracting myself, etc.)",
}
,
"depression" : {
    "Q":"Which statement best describes your DEPRESSION currently?",
    1:"I can barely get out of bed",
    2:"It’s a struggle to eat, shower, or brush my teeth",
    3:"It’s difficult to find motivation to leave the house",
    4:"It’s a struggle, but I do manage to get out of the house and complete 1-2 things I need to do",
    5:"There are ups and downs, but I generally feel pretty good",
}
,
"family" : {
    "Q":"Which statement best describes your relationship with your FAMILY?",
    1:"I can barely get out of bed",
    2:"I only talk with them when absolutely necessary",
    3:"The interactions are always tense and stressful, so I generally avoid them",
    4:"I love them, but I don’t feel like they really understand me",
    5:"It’s not perfect, but man, we’ve come a long way!",
}

,
"routineStructure" : {
    "Q":"Which statement best describes your ROUTINE/STRUCTURE currently?",
    1:"I have nothing on my schedule",
    2:"I have 1-2 scheduled appointments and meetings each week",
    3:"I’m in the process of putting together some structure in my days/weeks",
    4:"I have 4-6 things I get to consistently each week",
    5:"I have a balanced routine of things I get to 5-6 days/week, and include some rest and downtime",
}

,
"supportSystem" : {
    "Q":"Which statement best describes your SUPPORT SYSTEM currently?",
    1:"I have no one in my life I can trust to support me",
    2:"I have some friends and family that support me, but they don’t always understand what I’m going through",
    3:"I have a therapist/psychiatrist/coach to support me",
    4:"I have at least 3 people I know I can go to for support",
    5:"I have a good mix of family, friends, and professional supports around me and I know I can go to anyone of them to support me if I’m struggling",
}
,
"future" : {
    "Q":"Which statement best describes how you feel about the FUTURE?",
    1:"It feels impossible that anything will ever change for the better",
    2:"I don’t feel I have the skills to make the required changes for progress",
    3:"I have the skills, but it feels too difficult to sustain the progress",
    4:"Sometimes I feel like I’m making progress, and other times I feel like I haven’t made any progress",
    5:"It’s not perfect, but I have faith I have what it takes to create the life I want to live",
}
,

"emotionalResponse" : {
    "Q":"Which statement best describes your EMOTIONAL REACTIVITY currently?",
    1:"I’m constantly angry, annoyed, anxious, and/or overwhelmed all the time",
    2:"I don’t want to be in stressful/chaotic situations, but they always have a way of finding me",
    3:"I’m usually pretty calm when I’m by myself, but it’s other people I’m around that create drama in my life",
    4:"I can sometimes see or understand the other person’s perspective",
    5:"I can usually see my part in situations, and have learned to pause, before responding",
}
,
"financialIndependence" : {
    "Q":"Which statement best describes your FINANCIAL INDEPENDENCE currently?",
    1:"I am 100% dependent on someone else (family, significant other, friends)",
    2:"I am working on putting things in place to be more financially independent",
    3:"I have some income from part-time jobs, and still need >50% financial support",
    4:"I have income from a full-time job, and <25% financial support",
    5:"I am living 100% from the income that I generate",
}
}

export default clientQuestions;
//1. Which statement best describes your SOBRIETY currently?
// I’m drinking and/or using drugs 5-7 days/week
// I’m drinking and/or using drugs 1-4 times/month
// I’m not drinking and/or using drugs, and having pretty intense cravings
// I’m not drinking and/or using drugs, and learning to accept the new normal
// I’m not drinking and/or using drugs, and feel pretty solid about my sobriety


//2. Which statement best describes your FOOD + NUTRITION currently?
// I’m focused on staying sober/stabilizing, and I can’t even think about this right now
// I’m consuming a lot of sugar (sodas, candy, sweets) just trying to make it through the day
// I’m bringing in more awareness to what I’m eating
// I have a desire to eat more nutrient-rich foods (fruits, vegetables, leafy greens, etc.)
// I have incorporated a balanced diet and feel good about what I put in my body

//3. Which statement best describes your PURPOSE currently?
// I feel so lost, overwhelmed, and hopeless by the concept of “purpose” or anything about the future
// I feel dissatisfied with my life
// I’m working on putting things in place
// I’m employed/in school/volunteering
// I feel very satisfied in my life and feel like I’m living my purpose

//4. Which statement best describes your SLEEP currently?
// I’m getting less than 4 hours of sleep/night
// I have trouble falling/staying asleep
// I’m getting close to 6 hours of sleep/night
// I feel pretty sleepy and tired most days
// I’m sleeping at least 8 hours/night and feel well-rested

//5. Which statement best describes your ANXIETY currently?
// I feel ruled by my anxiety all day, everyday
// I spend more than 80% of my time overwhelmed and anxious about things
// I spend about 50% of my time feeling anxious about things
// I find myself trying to control things I can't control
// I am aware of my anxiety, but keep it at bay by using tools (breathing, being in the present moment, distracting myself, etc.)

//6. Which statement best describes your DEPRESSION currently?
// I can barely get out of bed
// It’s a struggle to eat, shower, or brush my teeth
// It’s difficult to find motivation to leave the house
// It’s a struggle, but I do manage to get out of the house and complete 1-2 things I need to do
// There are ups and downs, but I generally feel pretty good

//7. Which statement best describes your relationship with your FAMILY? -------->
// I don’t talk or communicate with them at all
// I only talk with them when absolutely necessary
// The interactions are always tense and stressful, so I generally avoid them
// I love them, but I don’t feel like they really understand me
// It’s not perfect, but man, we’ve come a long way!

//8. Which statement best describes your ROUTINE/STRUCTURE currently?
// I have nothing on my schedule
// I have 1-2 scheduled appointments and meetings each week
// I’m in the process of putting together some structure in my days/weeks
// I have 4-6 things I get to consistently each week
// I have a balanced routine of things I get to 5-6 days/week, and include some rest and downtime


//9. Which statement best describes your SUPPORT SYSTEM currently?
// I have no one in my life I can trust to support me
// I have some friends and family that support me, but they don’t always understand what I’m going through
// I have a therapist/psychiatrist/coach to support me
// I have at least 3 people I know I can go to for support
// I have a good mix of family, friends, and professional supports around me and I know I can go to anyone of them to support me if I’m struggling

//10. Which statement best describes how you feel about the FUTURE?
// It feels impossible that anything will ever change for the better
// I don’t feel I have the skills to make the required changes for progress
// I have the skills, but it feels too difficult to sustain the progress
// Sometimes I feel like I’m making progress, and other times I feel like I haven’t made any progress
// It’s not perfect, but I have faith I have what it takes to create the life I want to live

//11. Which statement best describes your EMOTIONAL REACTIVITY currently?
// I’m constantly angry, annoyed, anxious, and/or overwhelmed all the time
// I don’t want to be in stressful/chaotic situations, but they always have a way of finding me
// I’m usually pretty calm when I’m by myself, but it’s other people I’m around that create drama in my life
// I can sometimes see or understand the other person’s perspective
// I can usually see my part in situations, and have learned to pause, before responding

//12. Which statement best describes your FINANCIAL INDEPENDENCE currently?
// I am 100% dependent on someone else (family, significant other, friends)
// I am working on putting things in place to be more financially independent
// I have some income from part-time jobs, and still need >50% financial support
// I have income from a full-time job, and <25% financial support
// I am living 100% from the income that I generate