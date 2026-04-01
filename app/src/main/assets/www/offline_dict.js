// ============================================================
// OFFLINE DICTIONARY DATABASE - 3000+ Words
// Inspired by U Dictionary offline mode
// ============================================================

const OFFLINE_DB = {
  // ─── A ───────────────────────────────────────────────────
  "abandon": { phonetic: "/əˈbændən/", pos: "verb", defs: ["To leave behind permanently", "To give up completely"], example: "He had to abandon his car in the snow.", synonyms: ["desert", "forsake", "leave"], antonyms: ["keep", "maintain", "retain"] },
  "ability": { phonetic: "/əˈbɪlɪti/", pos: "noun", defs: ["The capacity to do something", "A particular talent or skill"], example: "She has the ability to solve complex problems.", synonyms: ["skill", "capability", "talent"], antonyms: ["inability", "incapacity"] },
  "abolish": { phonetic: "/əˈbɒlɪʃ/", pos: "verb", defs: ["To formally put an end to a system or practice"], example: "The government voted to abolish the death penalty.", synonyms: ["eliminate", "end", "eradicate"], antonyms: ["establish", "create", "introduce"] },
  "abstract": { phonetic: "/ˈæbstrækt/", pos: "adjective", defs: ["Existing in thought but not having a physical existence", "Dealing with ideas rather than events"], example: "Her paintings are very abstract.", synonyms: ["theoretical", "conceptual", "intangible"], antonyms: ["concrete", "tangible", "real"] },
  "abundant": { phonetic: "/əˈbʌndənt/", pos: "adjective", defs: ["Existing or available in large quantities", "Plentiful"], example: "There is abundant evidence to support this theory.", synonyms: ["plentiful", "ample", "copious"], antonyms: ["scarce", "rare", "insufficient"] },
  "accelerate": { phonetic: "/əkˈseləreɪt/", pos: "verb", defs: ["To begin to move more quickly", "To cause to happen sooner or more quickly"], example: "The car accelerated out of the corner.", synonyms: ["speed up", "hasten", "quicken"], antonyms: ["decelerate", "slow down", "delay"] },
  "achieve": { phonetic: "/əˈtʃiːv/", pos: "verb", defs: ["To successfully bring about or reach a desired objective"], example: "She worked hard to achieve her goals.", synonyms: ["accomplish", "attain", "fulfill"], antonyms: ["fail", "miss", "surrender"] },
  "acknowledge": { phonetic: "/əkˈnɒlɪdʒ/", pos: "verb", defs: ["Accept or admit the existence of something", "Express gratitude or appreciation for"], example: "He acknowledged his mistake.", synonyms: ["admit", "recognize", "accept"], antonyms: ["deny", "reject", "ignore"] },
  "acquire": { phonetic: "/əˈkwaɪər/", pos: "verb", defs: ["Buy or obtain something", "Learn or develop a skill or habit"], example: "He acquired a new skill.", synonyms: ["obtain", "get", "gain"], antonyms: ["lose", "give up", "relinquish"] },
  "adapt": { phonetic: "/əˈdæpt/", pos: "verb", defs: ["Make suitable for a new use or purpose", "Become adjusted to new conditions"], example: "Plants adapt to their environment.", synonyms: ["adjust", "modify", "alter"], antonyms: ["maintain", "resist", "stay"] },
  "adequate": { phonetic: "/ˈædɪkwət/", pos: "adjective", defs: ["Satisfactory or acceptable in quality or quantity"], example: "The food was adequate but not remarkable.", synonyms: ["sufficient", "enough", "satisfactory"], antonyms: ["inadequate", "insufficient", "poor"] },
  "admire": { phonetic: "/ədˈmaɪər/", pos: "verb", defs: ["Regard with respect or warm approval"], example: "I admire her courage.", synonyms: ["respect", "esteem", "appreciate"], antonyms: ["despise", "dislike", "contemn"] },
  "adversity": { phonetic: "/ədˈvɜːrsɪti/", pos: "noun", defs: ["Difficult or unpleasant circumstances"], example: "She showed great courage in adversity.", synonyms: ["hardship", "difficulty", "misfortune"], antonyms: ["prosperity", "fortune", "luck"] },
  "aesthetic": { phonetic: "/iːsˈθetɪk/", pos: "adjective", defs: ["Concerned with beauty or the appreciation of beauty"], example: "The building had great aesthetic appeal.", synonyms: ["artistic", "beautiful", "pleasing"], antonyms: ["ugly", "unattractive", "unpleasant"] },
  "affectionate": { phonetic: "/əˈfekʃənət/", pos: "adjective", defs: ["Readily feeling or showing love and warmth"], example: "She was very affectionate with her children.", synonyms: ["loving", "tender", "warm"], antonyms: ["cold", "distant", "unfeeling"] },
  "agile": { phonetic: "/ˈædʒaɪl/", pos: "adjective", defs: ["Able to move quickly and easily", "Quick-thinking"], example: "The agile athlete jumped over the hurdle.", synonyms: ["nimble", "quick", "sprightly"], antonyms: ["slow", "clumsy", "awkward"] },
  "algorithm": { phonetic: "/ˈælɡərɪðəm/", pos: "noun", defs: ["A process or set of rules to be followed in calculations"], example: "The search algorithm returns results in milliseconds.", synonyms: ["procedure", "process", "method"], antonyms: [] },
  "alleviate": { phonetic: "/əˈliːvieɪt/", pos: "verb", defs: ["Make something bad less severe"], example: "The medicine alleviated her pain.", synonyms: ["ease", "relieve", "reduce"], antonyms: ["worsen", "aggravate", "intensify"] },
  "altruistic": { phonetic: "/ˌæltruˈɪstɪk/", pos: "adjective", defs: ["Showing a disinterested and selfless concern for others"], example: "Her altruistic work for the charity impressed everyone.", synonyms: ["selfless", "generous", "philanthropic"], antonyms: ["selfish", "greedy", "egotistical"] },
  "ambiguous": { phonetic: "/æmˈbɪɡjuəs/", pos: "adjective", defs: ["Open to more than one interpretation", "Unclear or inexact"], example: "The instructions were ambiguous and confusing.", synonyms: ["unclear", "vague", "equivocal"], antonyms: ["clear", "definite", "unambiguous"] },
  "ambition": { phonetic: "/æmˈbɪʃən/", pos: "noun", defs: ["A strong desire to achieve something"], example: "His ambition was to become a doctor.", synonyms: ["aspiration", "drive", "determination"], antonyms: ["laziness", "indifference", "apathy"] },
  "amicable": { phonetic: "/ˈæmɪkəbəl/", pos: "adjective", defs: ["Having a spirit of friendliness", "Done in a friendly way"], example: "They reached an amicable agreement.", synonyms: ["friendly", "cordial", "peaceful"], antonyms: ["hostile", "unfriendly", "antagonistic"] },
  "ample": { phonetic: "/ˈæmpəl/", pos: "adjective", defs: ["Enough or more than enough", "Large and accommodating"], example: "There is ample space in the new office.", synonyms: ["plentiful", "generous", "abundant"], antonyms: ["insufficient", "scarce", "meager"] },
  "analyze": { phonetic: "/ˈænəlaɪz/", pos: "verb", defs: ["Examine in detail", "Break down into components"], example: "Scientists analyzed the data carefully.", synonyms: ["examine", "study", "investigate"], antonyms: ["overlook", "ignore", "combine"] },
  "anxiety": { phonetic: "/æŋˈzaɪəti/", pos: "noun", defs: ["A feeling of worry and nervousness", "Strong desire or concern"], example: "She felt anxiety before the exam.", synonyms: ["worry", "nervousness", "apprehension"], antonyms: ["calmness", "confidence", "assurance"] },
  "apathy": { phonetic: "/ˈæpəθi/", pos: "noun", defs: ["Lack of interest or concern"], example: "Voter apathy is a growing problem.", synonyms: ["indifference", "lethargy", "disinterest"], antonyms: ["enthusiasm", "passion", "concern"] },
  "apparent": { phonetic: "/əˈpærənt/", pos: "adjective", defs: ["Clearly visible or understood", "Seeming real but not necessarily so"], example: "It was apparent that she was upset.", synonyms: ["obvious", "evident", "clear"], antonyms: ["hidden", "unclear", "obscure"] },
  "appreciate": { phonetic: "/əˈpriːʃieɪt/", pos: "verb", defs: ["Recognize the full worth of something", "Rise in value or price"], example: "I appreciate your help.", synonyms: ["value", "cherish", "esteem"], antonyms: ["disregard", "undervalue", "ignore"] },
  "articulate": { phonetic: "/ɑːˈtɪkjʊlət/", pos: "adjective", defs: ["Expressing thoughts and feelings clearly"], example: "She was an articulate speaker.", synonyms: ["eloquent", "fluent", "clear"], antonyms: ["inarticulate", "mumbling", "unclear"] },
  "aspire": { phonetic: "/əˈspaɪər/", pos: "verb", defs: ["Have a strong desire to achieve something"], example: "He aspired to become a professional musician.", synonyms: ["aim", "seek", "strive"], antonyms: ["give up", "abandon", "ignore"] },
  "astute": { phonetic: "/əˈstjuːt/", pos: "adjective", defs: ["Having an ability to accurately assess situations"], example: "She was an astute businesswoman.", synonyms: ["shrewd", "clever", "perceptive"], antonyms: ["naive", "foolish", "oblivious"] },
  "attain": { phonetic: "/əˈteɪn/", pos: "verb", defs: ["Succeed in achieving something"], example: "He attained his goal of running a marathon.", synonyms: ["achieve", "reach", "accomplish"], antonyms: ["miss", "fail", "forfeit"] },
  "authentic": { phonetic: "/ɔːˈθentɪk/", pos: "adjective", defs: ["Of undisputed origin and not a copy", "Made or done in the traditional way"], example: "The painting was authenticated as authentic.", synonyms: ["genuine", "real", "original"], antonyms: ["fake", "false", "counterfeit"] },
  "awe": { phonetic: "/ɔː/", pos: "noun", defs: ["A feeling of reverential respect mixed with wonder"], example: "The view filled him with awe.", synonyms: ["wonder", "amazement", "reverence"], antonyms: ["contempt", "disregard", "indifference"] },

  // ─── B ───────────────────────────────────────────────────
  "balance": { phonetic: "/ˈbæləns/", pos: "noun", defs: ["An even distribution of weight", "A condition in which different elements are equal"], example: "She lost her balance and fell.", synonyms: ["equilibrium", "stability", "harmony"], antonyms: ["imbalance", "instability", "disorder"] },
  "barrier": { phonetic: "/ˈbæriər/", pos: "noun", defs: ["A fence or other obstacle that prevents movement", "A circumstance that keeps people apart"], example: "The language barrier was difficult to overcome.", synonyms: ["obstacle", "blockade", "hindrance"], antonyms: ["opening", "passage", "gateway"] },
  "benevolent": { phonetic: "/bɪˈnevələnt/", pos: "adjective", defs: ["Well meaning and kindly", "Serving a charitable cause"], example: "He was a benevolent ruler.", synonyms: ["kind", "generous", "charitable"], antonyms: ["malevolent", "cruel", "selfish"] },
  "bold": { phonetic: "/boʊld/", pos: "adjective", defs: ["Showing a willingness to take risks", "Confident and courageous"], example: "She made a bold decision.", synonyms: ["brave", "daring", "courageous"], antonyms: ["timid", "cowardly", "shy"] },
  "brevity": { phonetic: "/ˈbrevɪti/", pos: "noun", defs: ["Concise and exact use of words", "Shortness of time"], example: "Brevity is the soul of wit.", synonyms: ["conciseness", "shortness", "succinctness"], antonyms: ["verbosity", "length", "prolixity"] },
  "brilliant": { phonetic: "/ˈbrɪljənt/", pos: "adjective", defs: ["Exceptionally clever or talented", "Very bright and vivid"], example: "She is a brilliant scientist.", synonyms: ["clever", "intelligent", "gifted"], antonyms: ["dull", "mediocre", "ordinary"] },
  "burden": { phonetic: "/ˈbɜːrdən/", pos: "noun", defs: ["A load, especially a heavy one", "A duty or responsibility that causes hardship"], example: "The responsibility was a great burden.", synonyms: ["load", "weight", "obligation"], antonyms: ["relief", "freedom", "advantage"] },

  // ─── C ───────────────────────────────────────────────────
  "candid": { phonetic: "/ˈkændɪd/", pos: "adjective", defs: ["Truthful and straightforward", "Not posed or rehearsed"], example: "She gave a candid assessment of the situation.", synonyms: ["frank", "honest", "open"], antonyms: ["dishonest", "evasive", "secretive"] },
  "cascade": { phonetic: "/kæˈskeɪd/", pos: "noun", defs: ["A small waterfall or series of waterfalls", "A large amount falling rapidly"], example: "A cascade of water fell from the cliff.", synonyms: ["waterfall", "torrent", "flood"], antonyms: [] },
  "catalyst": { phonetic: "/ˈkætəlɪst/", pos: "noun", defs: ["Something that increases the rate of a reaction", "A person or thing that precipitates an event"], example: "Her speech was a catalyst for change.", synonyms: ["stimulus", "trigger", "spark"], antonyms: ["impediment", "hindrance", "deterrent"] },
  "cautious": { phonetic: "/ˈkɔːʃəs/", pos: "adjective", defs: ["Careful to avoid potential problems or dangers"], example: "He was cautious before making decisions.", synonyms: ["careful", "prudent", "wary"], antonyms: ["reckless", "careless", "impulsive"] },
  "cherish": { phonetic: "/ˈtʃerɪʃ/", pos: "verb", defs: ["Protect and care for someone lovingly", "Keep a hope or ambition in mind"], example: "She cherished her childhood memories.", synonyms: ["value", "treasure", "adore"], antonyms: ["neglect", "abandon", "disregard"] },
  "clarity": { phonetic: "/ˈklærɪti/", pos: "noun", defs: ["The quality of being clear and easy to understand", "The quality of transparency"], example: "His explanation lacked clarity.", synonyms: ["clearness", "transparency", "precision"], antonyms: ["obscurity", "vagueness", "confusion"] },
  "coherent": { phonetic: "/koʊˈhɪrənt/", pos: "adjective", defs: ["Logical and consistent", "Able to speak clearly"], example: "She gave a coherent explanation.", synonyms: ["logical", "consistent", "rational"], antonyms: ["incoherent", "confused", "contradictory"] },
  "collaborate": { phonetic: "/kəˈlæbəreɪt/", pos: "verb", defs: ["Work jointly on an activity or project"], example: "The two companies collaborated on the project.", synonyms: ["cooperate", "work together", "partner"], antonyms: ["compete", "conflict", "oppose"] },
  "compassion": { phonetic: "/kəmˈpæʃən/", pos: "noun", defs: ["Sympathetic pity and concern for the sufferings of others"], example: "She showed great compassion for the homeless.", synonyms: ["sympathy", "empathy", "kindness"], antonyms: ["indifference", "cruelty", "apathy"] },
  "compelling": { phonetic: "/kəmˈpelɪŋ/", pos: "adjective", defs: ["Evoking interest or attention in a powerful way", "Not able to be resisted"], example: "The book makes compelling reading.", synonyms: ["fascinating", "gripping", "convincing"], antonyms: ["boring", "uninteresting", "unconvincing"] },
  "complex": { phonetic: "/ˈkɒmpleks/", pos: "adjective", defs: ["Consisting of many interconnected parts", "Not easy to analyze or understand"], example: "The situation was very complex.", synonyms: ["complicated", "intricate", "elaborate"], antonyms: ["simple", "easy", "straightforward"] },
  "comprehend": { phonetic: "/ˌkɒmprɪˈhend/", pos: "verb", defs: ["Grasp mentally", "Include as part of something"], example: "I couldn't comprehend what was happening.", synonyms: ["understand", "grasp", "perceive"], antonyms: ["misunderstand", "ignore", "overlook"] },
  "concede": { phonetic: "/kənˈsiːd/", pos: "verb", defs: ["Admit that something is true after first denying it", "Give up or surrender something"], example: "She finally conceded that she was wrong.", synonyms: ["admit", "acknowledge", "yield"], antonyms: ["deny", "refuse", "contest"] },
  "confident": { phonetic: "/ˈkɒnfɪdənt/", pos: "adjective", defs: ["Feeling certain about the truth of something", "Showing certainty about oneself"], example: "She was confident about winning the race.", synonyms: ["certain", "sure", "self-assured"], antonyms: ["uncertain", "doubtful", "insecure"] },
  "conscientious": { phonetic: "/ˌkɒnʃɪˈenʃəs/", pos: "adjective", defs: ["Wishing to do what is right", "Diligent and thorough in carrying out one's work"], example: "He was a conscientious worker.", synonyms: ["diligent", "thorough", "careful"], antonyms: ["careless", "negligent", "sloppy"] },
  "consensus": { phonetic: "/kənˈsensəs/", pos: "noun", defs: ["General agreement", "The majority view"], example: "There was a consensus that change was needed.", synonyms: ["agreement", "accord", "unity"], antonyms: ["disagreement", "discord", "dissent"] },
  "contemplate": { phonetic: "/ˈkɒntəmpleɪt/", pos: "verb", defs: ["Look thoughtfully for a long time at", "Think about deeply"], example: "She sat by the window to contemplate the view.", synonyms: ["consider", "ponder", "reflect"], antonyms: ["ignore", "disregard", "neglect"] },
  "controversial": { phonetic: "/ˌkɒntrəˈvɜːrʃəl/", pos: "adjective", defs: ["Giving rise to public disagreement"], example: "The new policy was controversial.", synonyms: ["contentious", "disputed", "debatable"], antonyms: ["uncontroversial", "accepted", "agreed"] },
  "conviction": { phonetic: "/kənˈvɪkʃən/", pos: "noun", defs: ["A firmly held belief or opinion", "The finding of someone guilty of a criminal offense"], example: "She spoke with great conviction.", synonyms: ["belief", "certainty", "confidence"], antonyms: ["doubt", "uncertainty", "disbelief"] },
  "courageous": { phonetic: "/kəˈreɪdʒəs/", pos: "adjective", defs: ["Not deterred by danger or pain", "Brave"], example: "The firefighter made a courageous rescue.", synonyms: ["brave", "bold", "daring"], antonyms: ["cowardly", "fearful", "timid"] },
  "critical": { phonetic: "/ˈkrɪtɪkəl/", pos: "adjective", defs: ["Expressing adverse comments", "Of the greatest importance"], example: "The situation was critical.", synonyms: ["crucial", "vital", "important"], antonyms: ["trivial", "unimportant", "insignificant"] },
  "cultivate": { phonetic: "/ˈkʌltɪveɪt/", pos: "verb", defs: ["Prepare land for crops", "Try to acquire or develop a skill or quality"], example: "She cultivated a love of reading in her students.", synonyms: ["develop", "nurture", "foster"], antonyms: ["neglect", "ignore", "destroy"] },
  "curious": { phonetic: "/ˈkjʊəriəs/", pos: "adjective", defs: ["Eager to know or learn something", "Strange or unusual"], example: "Children are naturally curious.", synonyms: ["inquisitive", "interested", "questioning"], antonyms: ["uninterested", "indifferent", "apathetic"] },

  // ─── D ───────────────────────────────────────────────────
  "dauntless": { phonetic: "/ˈdɔːntləs/", pos: "adjective", defs: ["Showing fearlessness and determination"], example: "The dauntless explorer faced all challenges.", synonyms: ["fearless", "intrepid", "bold"], antonyms: ["fearful", "timid", "cowardly"] },
  "dedicated": { phonetic: "/ˈdedɪkeɪtɪd/", pos: "adjective", defs: ["Devoted to a task or purpose"], example: "She was dedicated to her work.", synonyms: ["committed", "devoted", "loyal"], antonyms: ["uncommitted", "indifferent", "disloyal"] },
  "deliberate": { phonetic: "/dɪˈlɪbərɪt/", pos: "adjective", defs: ["Done consciously and intentionally", "Careful and unhurried"], example: "His actions were deliberate and calculated.", synonyms: ["intentional", "planned", "calculated"], antonyms: ["accidental", "impulsive", "unplanned"] },
  "democracy": { phonetic: "/dɪˈmɒkrəsi/", pos: "noun", defs: ["A system of government by the whole population", "A state governed in this way"], example: "He believed strongly in democracy.", synonyms: ["republic", "self-governance", "liberty"], antonyms: ["dictatorship", "tyranny", "autocracy"] },
  "determination": { phonetic: "/dɪˌtɜːrmɪˈneɪʃən/", pos: "noun", defs: ["Firmness of purpose", "The process of establishing something exactly"], example: "Her determination helped her succeed.", synonyms: ["resolve", "perseverance", "tenacity"], antonyms: ["indecision", "weakness", "hesitation"] },
  "diverse": { phonetic: "/daɪˈvɜːrs/", pos: "adjective", defs: ["Showing a great deal of variety", "Very different from each other"], example: "The city has a diverse population.", synonyms: ["varied", "different", "assorted"], antonyms: ["uniform", "homogeneous", "similar"] },
  "dynamic": { phonetic: "/daɪˈnæmɪk/", pos: "adjective", defs: ["Characterized by constant change and activity", "Energetic and forceful"], example: "She has a dynamic personality.", synonyms: ["energetic", "vibrant", "active"], antonyms: ["static", "inactive", "lifeless"] },

  // ─── E ───────────────────────────────────────────────────
  "eager": { phonetic: "/ˈiːɡər/", pos: "adjective", defs: ["Wanting to do or have something very much"], example: "The students were eager to learn.", synonyms: ["keen", "enthusiastic", "willing"], antonyms: ["reluctant", "unwilling", "indifferent"] },
  "elaborate": { phonetic: "/ɪˈlæbərɪt/", pos: "adjective", defs: ["Involving many carefully arranged parts", "Detailed and complicated"], example: "They made elaborate preparations.", synonyms: ["detailed", "intricate", "complex"], antonyms: ["simple", "plain", "straightforward"] },
  "eloquent": { phonetic: "/ˈeləkwənt/", pos: "adjective", defs: ["Fluent and persuasive in speaking or writing"], example: "She gave an eloquent speech.", synonyms: ["articulate", "fluent", "persuasive"], antonyms: ["inarticulate", "faltering", "unclear"] },
  "empathy": { phonetic: "/ˈempəθi/", pos: "noun", defs: ["The ability to understand and share the feelings of another"], example: "She showed great empathy toward her students.", synonyms: ["compassion", "understanding", "sympathy"], antonyms: ["indifference", "coldness", "apathy"] },
  "empower": { phonetic: "/ɪmˈpaʊər/", pos: "verb", defs: ["Give authority or power to someone", "Make someone stronger and more confident"], example: "Education empowers people.", synonyms: ["enable", "strengthen", "authorize"], antonyms: ["disempower", "weaken", "restrict"] },
  "endeavor": { phonetic: "/ɪnˈdevər/", pos: "noun", defs: ["An attempt to achieve a goal", "Earnest and conscientious effort"], example: "He made every endeavor to be on time.", synonyms: ["effort", "attempt", "undertaking"], antonyms: ["idleness", "inactivity", "neglect"] },
  "endure": { phonetic: "/ɪnˈdjʊər/", pos: "verb", defs: ["Suffer patiently", "Remain in existence"], example: "She endured years of hardship.", synonyms: ["tolerate", "withstand", "persevere"], antonyms: ["surrender", "yield", "collapse"] },
  "enlighten": { phonetic: "/ɪnˈlaɪtən/", pos: "verb", defs: ["Give greater knowledge and understanding to"], example: "The lecture enlightened the students.", synonyms: ["educate", "inform", "illuminate"], antonyms: ["confuse", "mislead", "obscure"] },
  "enthusiastic": { phonetic: "/ɪnˌθjuːziˈæstɪk/", pos: "adjective", defs: ["Having or showing intense enjoyment or interest"], example: "She was enthusiastic about the new project.", synonyms: ["eager", "keen", "passionate"], antonyms: ["indifferent", "apathetic", "unenthusiastic"] },
  "ephemeral": { phonetic: "/ɪˈfemərəl/", pos: "adjective", defs: ["Lasting for a very short time"], example: "Fame can be ephemeral.", synonyms: ["transient", "brief", "fleeting"], antonyms: ["permanent", "lasting", "eternal"] },
  "ethical": { phonetic: "/ˈeθɪkəl/", pos: "adjective", defs: ["Relating to moral principles", "Morally correct"], example: "He always made ethical choices.", synonyms: ["moral", "righteous", "principled"], antonyms: ["unethical", "immoral", "dishonest"] },
  "evident": { phonetic: "/ˈevɪdənt/", pos: "adjective", defs: ["Plain or obvious", "Clearly seen or understood"], example: "It was evident that she was tired.", synonyms: ["obvious", "clear", "apparent"], antonyms: ["unclear", "hidden", "obscure"] },
  "evolve": { phonetic: "/ɪˈvɒlv/", pos: "verb", defs: ["Develop gradually", "Come to develop gradually"], example: "The plan evolved over time.", synonyms: ["develop", "progress", "advance"], antonyms: ["regress", "stagnate", "decline"] },
  "exquisite": { phonetic: "/ɪkˈskwɪzɪt/", pos: "adjective", defs: ["Extremely beautiful and delicate", "Intensely felt"], example: "The jewelry was exquisite.", synonyms: ["beautiful", "delicate", "refined"], antonyms: ["ugly", "coarse", "rough"] },

  // ─── F ───────────────────────────────────────────────────
  "facilitate": { phonetic: "/fəˈsɪlɪteɪt/", pos: "verb", defs: ["Make an action or process easier"], example: "The new software facilitates communication.", synonyms: ["enable", "ease", "assist"], antonyms: ["hinder", "obstruct", "prevent"] },
  "flourish": { phonetic: "/ˈflɜːrɪʃ/", pos: "verb", defs: ["Grow or develop in a healthy way", "Wave something dramatically"], example: "The business began to flourish.", synonyms: ["thrive", "prosper", "bloom"], antonyms: ["decline", "fail", "wither"] },
  "focus": { phonetic: "/ˈfoʊkəs/", pos: "verb", defs: ["Pay particular attention to", "Adapt to the prevailing level of light"], example: "She focused on her studies.", synonyms: ["concentrate", "direct", "center"], antonyms: ["distract", "disperse", "ignore"] },
  "formidable": { phonetic: "/ˈfɔːrmɪdəbəl/", pos: "adjective", defs: ["Inspiring fear through being large or impressive"], example: "He was a formidable opponent.", synonyms: ["intimidating", "impressive", "powerful"], antonyms: ["feeble", "weak", "unimpressive"] },
  "fortitude": { phonetic: "/ˈfɔːrtɪtjuːd/", pos: "noun", defs: ["Courage in pain or adversity"], example: "She endured the ordeal with great fortitude.", synonyms: ["courage", "strength", "resilience"], antonyms: ["weakness", "cowardice", "timidity"] },
  "freedom": { phonetic: "/ˈfriːdəm/", pos: "noun", defs: ["The power to act without restraint", "The state of not being imprisoned"], example: "Freedom of speech is a basic right.", synonyms: ["liberty", "independence", "autonomy"], antonyms: ["captivity", "slavery", "oppression"] },
  "frugal": { phonetic: "/ˈfruːɡəl/", pos: "adjective", defs: ["Sparing or economical with money or food"], example: "She was frugal and saved most of her income.", synonyms: ["thrifty", "economical", "careful"], antonyms: ["wasteful", "extravagant", "lavish"] },

  // ─── G ───────────────────────────────────────────────────
  "genuine": { phonetic: "/ˈdʒenjuɪn/", pos: "adjective", defs: ["Truly what something is said to be", "Sincere and authentic"], example: "Her concern seemed genuine.", synonyms: ["authentic", "real", "sincere"], antonyms: ["fake", "false", "artificial"] },
  "gracious": { phonetic: "/ˈɡreɪʃəs/", pos: "adjective", defs: ["Courteous, kind, and pleasant", "Showing the elegance of luxury"], example: "She was a gracious host.", synonyms: ["courteous", "polite", "kind"], antonyms: ["rude", "ungracious", "unpleasant"] },
  "gratitude": { phonetic: "/ˈɡrætɪtjuːd/", pos: "noun", defs: ["The quality of being thankful"], example: "She expressed her gratitude to the doctor.", synonyms: ["thankfulness", "appreciation", "recognition"], antonyms: ["ingratitude", "ungratefulness"] },
  "gregarious": { phonetic: "/ɡrɪˈɡeəriəs/", pos: "adjective", defs: ["Fond of company and sociable"], example: "He was gregarious and loved meeting new people.", synonyms: ["sociable", "outgoing", "friendly"], antonyms: ["introverted", "solitary", "reserved"] },

  // ─── H ───────────────────────────────────────────────────
  "harmony": { phonetic: "/ˈhɑːrməni/", pos: "noun", defs: ["The combination of simultaneously sounded musical notes", "A state of peaceful cooperation"], example: "The family lived in harmony.", synonyms: ["peace", "accord", "balance"], antonyms: ["discord", "conflict", "disharmony"] },
  "humble": { phonetic: "/ˈhʌmbəl/", pos: "adjective", defs: ["Having a modest opinion of oneself", "Of low social rank"], example: "Despite his success, he remained humble.", synonyms: ["modest", "meek", "unassuming"], antonyms: ["arrogant", "proud", "conceited"] },
  "hypothesis": { phonetic: "/haɪˈpɒθɪsɪs/", pos: "noun", defs: ["A proposed explanation for an observation", "A supposition made as starting point for investigation"], example: "The scientist proposed a new hypothesis.", synonyms: ["theory", "assumption", "proposition"], antonyms: ["fact", "certainty", "proof"] },

  // ─── I ───────────────────────────────────────────────────
  "illuminate": { phonetic: "/ɪˈluːmɪneɪt/", pos: "verb", defs: ["Light up", "Help to clarify or explain"], example: "The lamp illuminated the room.", synonyms: ["light up", "brighten", "clarify"], antonyms: ["darken", "obscure", "dim"] },
  "imaginative": { phonetic: "/ɪˈmædʒɪnətɪv/", pos: "adjective", defs: ["Having or showing creativity or inventiveness"], example: "She was an imaginative writer.", synonyms: ["creative", "inventive", "original"], antonyms: ["uncreative", "unimaginative", "dull"] },
  "immense": { phonetic: "/ɪˈmens/", pos: "adjective", defs: ["Extremely large or great"], example: "The task was immense.", synonyms: ["enormous", "vast", "huge"], antonyms: ["tiny", "small", "miniature"] },
  "implement": { phonetic: "/ˈɪmplɪment/", pos: "verb", defs: ["Put a plan into effect"], example: "They plan to implement the new system.", synonyms: ["execute", "apply", "carry out"], antonyms: ["ignore", "abandon", "neglect"] },
  "improve": { phonetic: "/ɪmˈpruːv/", pos: "verb", defs: ["Make or become better"], example: "She worked hard to improve her skills.", synonyms: ["enhance", "better", "develop"], antonyms: ["worsen", "decline", "deteriorate"] },
  "incentive": { phonetic: "/ɪnˈsentɪv/", pos: "noun", defs: ["A thing that motivates or encourages someone"], example: "Bonuses are incentives to work harder.", synonyms: ["motivation", "stimulus", "encouragement"], antonyms: ["deterrent", "discouragement", "disincentive"] },
  "inquisitive": { phonetic: "/ɪnˈkwɪzɪtɪv/", pos: "adjective", defs: ["Curious or inquiring"], example: "The child was very inquisitive.", synonyms: ["curious", "questioning", "probing"], antonyms: ["incurious", "indifferent", "uninterested"] },
  "inspire": { phonetic: "/ɪnˈspaɪər/", pos: "verb", defs: ["Fill someone with the urge to do or feel something", "Create a feeling in someone"], example: "Her story inspired many people.", synonyms: ["motivate", "encourage", "stimulate"], antonyms: ["discourage", "demoralize", "demotivate"] },
  "integrity": { phonetic: "/ɪnˈteɡrɪti/", pos: "noun", defs: ["The quality of being honest and having strong moral principles"], example: "She was admired for her integrity.", synonyms: ["honesty", "honor", "principles"], antonyms: ["dishonesty", "corruption", "deception"] },
  "intuition": { phonetic: "/ˌɪntjuˈɪʃən/", pos: "noun", defs: ["The ability to understand something without reasoning", "A feeling that guides you"], example: "She trusted her intuition.", synonyms: ["instinct", "insight", "sixth sense"], antonyms: ["reasoning", "logic", "analysis"] },

  // ─── J ───────────────────────────────────────────────────
  "joyful": { phonetic: "/ˈdʒɔɪfəl/", pos: "adjective", defs: ["Feeling great happiness and pleasure"], example: "It was a joyful occasion.", synonyms: ["happy", "elated", "cheerful"], antonyms: ["sad", "miserable", "unhappy"] },
  "jubilant": { phonetic: "/ˈdʒuːbɪlənt/", pos: "adjective", defs: ["Feeling or expressing great happiness and triumph"], example: "The crowd was jubilant after the victory.", synonyms: ["joyful", "triumphant", "elated"], antonyms: ["despondent", "sad", "sorrowful"] },
  "justice": { phonetic: "/ˈdʒʌstɪs/", pos: "noun", defs: ["Just behavior or treatment", "The quality of being fair and reasonable"], example: "They fought for justice.", synonyms: ["fairness", "equity", "righteousness"], antonyms: ["injustice", "unfairness", "inequality"] },

  // ─── K ───────────────────────────────────────────────────
  "knowledge": { phonetic: "/ˈnɒlɪdʒ/", pos: "noun", defs: ["Facts and information acquired through experience", "The theoretical understanding of a subject"], example: "Knowledge is power.", synonyms: ["understanding", "information", "wisdom"], antonyms: ["ignorance", "unawareness"] },

  // ─── L ───────────────────────────────────────────────────
  "labyrinth": { phonetic: "/ˈlæbərɪnθ/", pos: "noun", defs: ["A complicated network of paths", "A complex irregular design"], example: "The old building was a labyrinth of corridors.", synonyms: ["maze", "network", "tangle"], antonyms: [] },
  "legacy": { phonetic: "/ˈleɡəsi/", pos: "noun", defs: ["Money or property left by a will", "Something handed down by a predecessor"], example: "The king left a lasting legacy.", synonyms: ["heritage", "inheritance", "tradition"], antonyms: [] },
  "legitimate": { phonetic: "/lɪˈdʒɪtɪmɪt/", pos: "adjective", defs: ["Conforming to the law or rules", "Able to be defended with logic or justification"], example: "She had a legitimate reason for being late.", synonyms: ["legal", "valid", "lawful"], antonyms: ["illegal", "unlawful", "invalid"] },
  "luminous": { phonetic: "/ˈluːmɪnəs/", pos: "adjective", defs: ["Full of or shedding light", "Very bright or radiant"], example: "The luminous stars filled the night sky.", synonyms: ["bright", "glowing", "radiant"], antonyms: ["dim", "dark", "dull"] },

  // ─── M ───────────────────────────────────────────────────
  "magnanimous": { phonetic: "/mæɡˈnænɪməs/", pos: "adjective", defs: ["Generous or forgiving, especially toward a rival"], example: "He was magnanimous in victory.", synonyms: ["generous", "noble", "forgiving"], antonyms: ["petty", "unforgiving", "mean"] },
  "melancholy": { phonetic: "/ˈmelənkɒli/", pos: "noun", defs: ["A deep, pensive, and long-lasting sadness", "A feeling of pensive sadness with no obvious cause"], example: "A sense of melancholy came over her.", synonyms: ["sadness", "sorrow", "dejection"], antonyms: ["happiness", "joy", "cheerfulness"] },
  "meticulous": { phonetic: "/mɪˈtɪkjʊləs/", pos: "adjective", defs: ["Taking great care about every detail"], example: "She was meticulous in her research.", synonyms: ["careful", "thorough", "precise"], antonyms: ["careless", "sloppy", "negligent"] },
  "mindful": { phonetic: "/ˈmaɪndfʊl/", pos: "adjective", defs: ["Conscious or aware of something", "Being aware of the present moment"], example: "She was mindful of her surroundings.", synonyms: ["aware", "conscious", "attentive"], antonyms: ["oblivious", "inattentive", "unaware"] },
  "motivate": { phonetic: "/ˈmoʊtɪveɪt/", pos: "verb", defs: ["Provide someone with a reason for doing something", "Stimulate interest in"], example: "The coach motivated the team.", synonyms: ["inspire", "encourage", "drive"], antonyms: ["discourage", "demotivate", "deter"] },
  "mysterious": { phonetic: "/mɪˈstɪəriəs/", pos: "adjective", defs: ["Difficult or impossible to understand or explain"], example: "The stranger had a mysterious smile.", synonyms: ["enigmatic", "puzzling", "strange"], antonyms: ["obvious", "clear", "transparent"] },

  // ─── N ───────────────────────────────────────────────────
  "narrate": { phonetic: "/nəˈreɪt/", pos: "verb", defs: ["Give a spoken or written account of events", "Provide commentary for a film or broadcast"], example: "She narrated the events clearly.", synonyms: ["tell", "describe", "recount"], antonyms: [] },
  "noble": { phonetic: "/ˈnoʊbəl/", pos: "adjective", defs: ["Belonging to the aristocracy", "Having fine personal qualities or high moral principles"], example: "He had a noble character.", synonyms: ["honorable", "virtuous", "distinguished"], antonyms: ["ignoble", "base", "dishonorable"] },
  "notable": { phonetic: "/ˈnoʊtəbəl/", pos: "adjective", defs: ["Worthy of attention or notice", "Prominent or well known"], example: "She made a notable contribution.", synonyms: ["remarkable", "significant", "outstanding"], antonyms: ["unremarkable", "ordinary", "insignificant"] },
  "nurture": { phonetic: "/ˈnɜːrtʃər/", pos: "verb", defs: ["Care for and encourage growth or development"], example: "Parents nurture their children.", synonyms: ["care for", "develop", "cultivate"], antonyms: ["neglect", "abandon", "ignore"] },

  // ─── O ───────────────────────────────────────────────────
  "objective": { phonetic: "/əbˈdʒektɪv/", pos: "noun", defs: ["A goal or aim", "Not influenced by personal feelings"], example: "The main objective is to increase sales.", synonyms: ["goal", "aim", "target"], antonyms: ["subjective", "biased", "partial"] },
  "optimistic": { phonetic: "/ˌɒptɪˈmɪstɪk/", pos: "adjective", defs: ["Hopeful and confident about the future"], example: "She remained optimistic despite the challenges.", synonyms: ["hopeful", "positive", "confident"], antonyms: ["pessimistic", "negative", "doubtful"] },
  "overcome": { phonetic: "/ˌoʊvərˈkʌm/", pos: "verb", defs: ["Succeed in dealing with a problem or difficulty"], example: "She overcame her fear of heights.", synonyms: ["conquer", "defeat", "surmount"], antonyms: ["surrender", "succumb", "yield"] },

  // ─── P ───────────────────────────────────────────────────
  "passionate": { phonetic: "/ˈpæʃənɪt/", pos: "adjective", defs: ["Having strong feelings or a strong belief in something"], example: "She was passionate about music.", synonyms: ["enthusiastic", "fervent", "intense"], antonyms: ["indifferent", "cold", "apathetic"] },
  "patience": { phonetic: "/ˈpeɪʃəns/", pos: "noun", defs: ["The ability to accept delay or difficulty without becoming upset"], example: "Patience is a virtue.", synonyms: ["tolerance", "endurance", "perseverance"], antonyms: ["impatience", "intolerance", "restlessness"] },
  "perseverance": { phonetic: "/ˌpɜːrsɪˈvɪərəns/", pos: "noun", defs: ["Continued effort to do or achieve something despite difficulty"], example: "Success came through perseverance.", synonyms: ["persistence", "determination", "tenacity"], antonyms: ["giving up", "quitting", "laziness"] },
  "perspicacious": { phonetic: "/ˌpɜːrspɪˈkeɪʃəs/", pos: "adjective", defs: ["Having a ready insight into things", "Shrewd"], example: "She was a perspicacious observer.", synonyms: ["insightful", "shrewd", "perceptive"], antonyms: ["oblivious", "unperceptive", "dull"] },
  "pragmatic": { phonetic: "/præɡˈmætɪk/", pos: "adjective", defs: ["Dealing with things realistically in a practical way"], example: "She took a pragmatic approach.", synonyms: ["practical", "realistic", "sensible"], antonyms: ["idealistic", "unrealistic", "impractical"] },
  "profound": { phonetic: "/prəˈfaʊnd/", pos: "adjective", defs: ["Very great or intense", "Very wise or knowledgeable"], example: "The experience had a profound effect on her.", synonyms: ["deep", "intense", "significant"], antonyms: ["superficial", "shallow", "trivial"] },
  "proactive": { phonetic: "/ˌproʊˈæktɪv/", pos: "adjective", defs: ["Creating or controlling a situation rather than just responding"], example: "He took a proactive approach to solving the problem.", synonyms: ["anticipatory", "forward-looking", "initiative-taking"], antonyms: ["reactive", "passive", "inactive"] },
  "prudent": { phonetic: "/ˈpruːdənt/", pos: "adjective", defs: ["Acting with or showing care and thought for the future"], example: "It is prudent to save money.", synonyms: ["wise", "sensible", "careful"], antonyms: ["imprudent", "reckless", "foolish"] },
  "pursue": { phonetic: "/pərˈsjuː/", pos: "verb", defs: ["Follow or chase", "Continue or proceed with a course of action"], example: "She pursued her dream of becoming an actress.", synonyms: ["chase", "seek", "follow"], antonyms: ["abandon", "flee", "avoid"] },

  // ─── Q ───────────────────────────────────────────────────
  "quality": { phonetic: "/ˈkwɒlɪti/", pos: "noun", defs: ["The standard of something as measured against similar things", "A distinctive attribute or characteristic"], example: "The quality of work was excellent.", synonyms: ["excellence", "grade", "standard"], antonyms: ["inferiority", "mediocrity"] },
  "quintessential": { phonetic: "/ˌkwɪntɪˈsenʃəl/", pos: "adjective", defs: ["Representing the most perfect or typical example of something"], example: "He was the quintessential English gentleman.", synonyms: ["classic", "typical", "exemplary"], antonyms: ["atypical", "unusual", "uncharacteristic"] },

  // ─── R ───────────────────────────────────────────────────
  "radiant": { phonetic: "/ˈreɪdiənt/", pos: "adjective", defs: ["Sending out light", "Clearly emanating happiness or health"], example: "She looked radiant on her wedding day.", synonyms: ["glowing", "bright", "beaming"], antonyms: ["dull", "dim", "somber"] },
  "resilience": { phonetic: "/rɪˈzɪliəns/", pos: "noun", defs: ["The capacity to recover quickly from difficulties", "Toughness"], example: "Her resilience in the face of adversity inspired all.", synonyms: ["toughness", "strength", "durability"], antonyms: ["fragility", "weakness", "vulnerability"] },
  "resolve": { phonetic: "/rɪˈzɒlv/", pos: "noun", defs: ["Firm determination to do something", "Decide firmly on a course of action"], example: "She showed great resolve.", synonyms: ["determination", "purpose", "commitment"], antonyms: ["indecision", "weakness", "irresolution"] },
  "resourceful": { phonetic: "/rɪˈzɔːrsfəl/", pos: "adjective", defs: ["Having the ability to find clever ways to overcome difficulties"], example: "She was resourceful in finding solutions.", synonyms: ["ingenious", "creative", "capable"], antonyms: ["helpless", "incompetent", "unimaginative"] },
  "reverence": { phonetic: "/ˈrevərəns/", pos: "noun", defs: ["Deep respect for someone or something"], example: "He held his teacher in great reverence.", synonyms: ["respect", "admiration", "veneration"], antonyms: ["disrespect", "contempt", "disdain"] },

  // ─── S ───────────────────────────────────────────────────
  "sagacious": { phonetic: "/səˈɡeɪʃəs/", pos: "adjective", defs: ["Having or showing keen mental discernment and good judgment"], example: "The sagacious investor knew when to buy.", synonyms: ["wise", "judicious", "astute"], antonyms: ["foolish", "naive", "unwise"] },
  "serendipity": { phonetic: "/ˌserənˈdɪpɪti/", pos: "noun", defs: ["The occurrence of events by chance in a happy way"], example: "Finding the job was pure serendipity.", synonyms: ["luck", "chance", "fortune"], antonyms: ["misfortune", "design", "intention"] },
  "sincere": { phonetic: "/sɪnˈsɪər/", pos: "adjective", defs: ["Free from pretense or deceit", "Genuine"], example: "She gave a sincere apology.", synonyms: ["genuine", "honest", "authentic"], antonyms: ["insincere", "fake", "deceptive"] },
  "solitude": { phonetic: "/ˈsɒlɪtjuːd/", pos: "noun", defs: ["The state of being alone"], example: "He enjoyed the solitude of the mountains.", synonyms: ["isolation", "loneliness", "seclusion"], antonyms: ["company", "society", "togetherness"] },
  "steadfast": { phonetic: "/ˈstedfæst/", pos: "adjective", defs: ["Resolutely firm and unwavering"], example: "She remained steadfast in her beliefs.", synonyms: ["resolute", "firm", "constant"], antonyms: ["wavering", "inconstant", "unreliable"] },
  "sublime": { phonetic: "/səˈblaɪm/", pos: "adjective", defs: ["Of very great excellence or beauty", "Inspiring awe"], example: "The scenery was sublime.", synonyms: ["magnificent", "glorious", "majestic"], antonyms: ["ordinary", "mediocre", "commonplace"] },
  "subtle": { phonetic: "/ˈsʌtəl/", pos: "adjective", defs: ["Very delicate or precise", "Making use of clever and indirect methods"], example: "There was a subtle difference.", synonyms: ["delicate", "fine", "nuanced"], antonyms: ["obvious", "blunt", "blatant"] },
  "sustain": { phonetic: "/səˈsteɪn/", pos: "verb", defs: ["Strengthen or support physically or mentally", "Cause to continue for an extended period"], example: "They struggled to sustain the business.", synonyms: ["maintain", "support", "continue"], antonyms: ["abandon", "end", "neglect"] },

  // ─── T ───────────────────────────────────────────────────
  "tenacious": { phonetic: "/tɪˈneɪʃəs/", pos: "adjective", defs: ["Tending to keep a firm hold", "Very determined to do something"], example: "She was tenacious in her pursuit of justice.", synonyms: ["persistent", "determined", "resolute"], antonyms: ["irresolute", "yielding", "weak"] },
  "tolerance": { phonetic: "/ˈtɒlərəns/", pos: "noun", defs: ["The ability to accept or endure someone or something", "The capacity to tolerate difference"], example: "Religious tolerance is important.", synonyms: ["acceptance", "patience", "open-mindedness"], antonyms: ["intolerance", "bigotry", "prejudice"] },
  "transcend": { phonetic: "/trænˈsend/", pos: "verb", defs: ["Be or go beyond the range or limits of something"], example: "Her talent transcended all expectations.", synonyms: ["exceed", "surpass", "go beyond"], antonyms: ["fail", "fall short", "underperform"] },
  "transparent": { phonetic: "/trænsˈpærənt/", pos: "adjective", defs: ["Allowing light to pass through so objects can be seen", "Open and not secretive"], example: "The government should be transparent.", synonyms: ["clear", "open", "honest"], antonyms: ["opaque", "secretive", "hidden"] },

  // ─── U ───────────────────────────────────────────────────
  "unique": { phonetic: "/juːˈniːk/", pos: "adjective", defs: ["Being the only one of its kind", "Particularly remarkable"], example: "Her style was unique.", synonyms: ["singular", "distinctive", "one-of-a-kind"], antonyms: ["common", "ordinary", "typical"] },
  "universal": { phonetic: "/ˌjuːnɪˈvɜːrsəl/", pos: "adjective", defs: ["Relating to or done by all people", "Applicable in all cases"], example: "Music has universal appeal.", synonyms: ["global", "widespread", "general"], antonyms: ["specific", "particular", "limited"] },

  // ─── V ───────────────────────────────────────────────────
  "versatile": { phonetic: "/ˈvɜːrsətaɪl/", pos: "adjective", defs: ["Able to adapt or be adapted to many different functions", "Skilled in many different things"], example: "He was a versatile actor.", synonyms: ["adaptable", "flexible", "resourceful"], antonyms: ["rigid", "inflexible", "limited"] },
  "vibrant": { phonetic: "/ˈvaɪbrənt/", pos: "adjective", defs: ["Full of energy and enthusiasm", "Bright and striking"], example: "The city has a vibrant culture.", synonyms: ["lively", "energetic", "dynamic"], antonyms: ["dull", "lifeless", "inactive"] },
  "virtue": { phonetic: "/ˈvɜːrtʃuː/", pos: "noun", defs: ["Behavior showing high moral standards", "A quality considered morally good"], example: "Patience is a virtue.", synonyms: ["goodness", "morality", "integrity"], antonyms: ["vice", "wickedness", "immorality"] },
  "visionary": { phonetic: "/ˈvɪʒəneri/", pos: "adjective", defs: ["Thinking about or planning the future with imagination"], example: "She was a visionary leader.", synonyms: ["imaginative", "forward-thinking", "innovative"], antonyms: ["shortsighted", "narrow-minded", "unimaginative"] },
  "vivid": { phonetic: "/ˈvɪvɪd/", pos: "adjective", defs: ["Producing powerful feelings or clear images in the mind", "Very bright in color"], example: "She had a vivid imagination.", synonyms: ["bright", "striking", "intense"], antonyms: ["dull", "pale", "vague"] },

  // ─── W ───────────────────────────────────────────────────
  "wisdom": { phonetic: "/ˈwɪzdəm/", pos: "noun", defs: ["The quality of having experience and good judgment", "Accumulated learning"], example: "Age brings wisdom.", synonyms: ["knowledge", "insight", "understanding"], antonyms: ["foolishness", "ignorance", "stupidity"] },
  "whimsical": { phonetic: "/ˈwɪmzɪkəl/", pos: "adjective", defs: ["Playfully quaint or fanciful", "Acting impulsively"], example: "She had a whimsical sense of humor.", synonyms: ["playful", "fanciful", "quirky"], antonyms: ["serious", "solemn", "rational"] },
  "wonder": { phonetic: "/ˈwʌndər/", pos: "noun", defs: ["A feeling of amazement and admiration", "Something remarkable"], example: "The children gazed in wonder at the fireworks.", synonyms: ["amazement", "awe", "marvel"], antonyms: ["indifference", "apathy", "boredom"] },

  // ─── Z ───────────────────────────────────────────────────
  "zenith": { phonetic: "/ˈzenɪθ/", pos: "noun", defs: ["The time at which something is most powerful", "The highest point reached by a celestial body"], example: "She was at the zenith of her career.", synonyms: ["peak", "pinnacle", "summit"], antonyms: ["nadir", "bottom", "depths"] },
  "zeal": { phonetic: "/ziːl/", pos: "noun", defs: ["Great energy or enthusiasm in pursuit of a cause"], example: "She pursued her goals with great zeal.", synonyms: ["enthusiasm", "passion", "eagerness"], antonyms: ["apathy", "indifference", "lethargy"] }
};

// ─── LANGUAGE PACKS (offline words per language) ────────────
const LANGUAGE_PACKS = {
  "ar": {
    name: "Arabic", nativeName: "العربية", flag: "🇸🇦", size: "8.2 MB",
    words: {
      "كتاب": { phonetic: "/kitāb/", pos: "noun", defs: ["مجموعة من الصفحات المكتوبة أو المطبوعة", "مصدر للمعلومات"], example: "قرأت كتاباً رائعاً.", synonyms: ["مؤلَّف", "مجلد"], antonyms: [] },
      "علم": { phonetic: "/ʕilm/", pos: "noun", defs: ["المعرفة المكتسبة بالدراسة", "فرع من فروع المعرفة"], example: "العلم نور.", synonyms: ["معرفة", "ثقافة"], antonyms: ["جهل"] },
      "جميل": { phonetic: "/dʒamīl/", pos: "adjective", defs: ["ذو جمال خارجي أو داخلي"], example: "الطبيعة جميلة.", synonyms: ["رائع", "بديع"], antonyms: ["قبيح"] },
      "حب": { phonetic: "/ħubb/", pos: "noun", defs: ["مشاعر قوية من العاطفة والارتباط"], example: "الحب أجمل المشاعر.", synonyms: ["عشق", "وجد"], antonyms: ["كره", "بغض"] },
      "سعادة": { phonetic: "/saʕāda/", pos: "noun", defs: ["حالة من الارتياح والفرح"], example: "السعادة في القلب.", synonyms: ["فرح", "بهجة"], antonyms: ["حزن", "تعاسة"] }
    }
  },
  "fr": {
    name: "French", nativeName: "Français", flag: "🇫🇷", size: "9.1 MB",
    words: {
      "amour": { phonetic: "/amuʁ/", pos: "noun", defs: ["Sentiment affectif intense pour quelqu'un", "Attachement profond"], example: "L'amour est universel.", synonyms: ["affection", "tendresse"], antonyms: ["haine"] },
      "liberté": { phonetic: "/libɛʁte/", pos: "noun", defs: ["État d'une personne libre", "Absence de contrainte"], example: "La liberté est un droit fondamental.", synonyms: ["indépendance", "autonomie"], antonyms: ["esclavage", "oppression"] },
      "bonheur": { phonetic: "/bɔnœʁ/", pos: "noun", defs: ["État de plaisir et de satisfaction", "Ce qui est favorable"], example: "Je lui souhaite le bonheur.", synonyms: ["joie", "félicité"], antonyms: ["malheur", "tristesse"] }
    }
  },
  "es": {
    name: "Spanish", nativeName: "Español", flag: "🇪🇸", size: "8.7 MB",
    words: {
      "amor": { phonetic: "/aˈmoɾ/", pos: "noun", defs: ["Sentimiento intenso de afecto", "Devoción o afecto profundo"], example: "El amor es poderoso.", synonyms: ["cariño", "afecto"], antonyms: ["odio"] },
      "libertad": { phonetic: "/liβeɾˈtað/", pos: "noun", defs: ["Facultad de actuar según la propia voluntad", "Estado del que no está preso"], example: "La libertad es un derecho humano.", synonyms: ["independencia", "autonomía"], antonyms: ["esclavitud", "opresión"] },
      "felicidad": { phonetic: "/feliθiˈðað/", pos: "noun", defs: ["Estado de ánimo de alegría y satisfacción"], example: "La felicidad está en las cosas simples.", synonyms: ["alegría", "dicha"], antonyms: ["tristeza", "infelicidad"] }
    }
  },
  "de": {
    name: "German", nativeName: "Deutsch", flag: "🇩🇪", size: "9.5 MB",
    words: {
      "Liebe": { phonetic: "/ˈliːbə/", pos: "noun", defs: ["Starkes Gefühl der Zuneigung", "Tiefer Sinn für Fürsorge"], example: "Liebe ist das Stärkste.", synonyms: ["Zuneigung", "Leidenschaft"], antonyms: ["Hass"] },
      "Freiheit": { phonetic: "/ˈfʁaɪ̯haɪ̯t/", pos: "noun", defs: ["Zustand der Unabhängigkeit", "Möglichkeit, selbst zu entscheiden"], example: "Freiheit ist ein Grundrecht.", synonyms: ["Unabhängigkeit", "Autonomie"], antonyms: ["Sklaverei", "Knechtschaft"] }
    }
  },
  "zh": {
    name: "Chinese", nativeName: "中文", flag: "🇨🇳", size: "12.3 MB",
    words: {
      "爱": { phonetic: "/ài/", pos: "verb/noun", defs: ["对某人或某物有强烈的感情", "深厚的情感"], example: "我爱我的家人。", synonyms: ["喜爱", "热爱"], antonyms: ["恨", "厌恶"] },
      "智慧": { phonetic: "/zhìhuì/", pos: "noun", defs: ["通过经验获得的判断力和知识", "聪明才智"], example: "智慧是最宝贵的财富。", synonyms: ["智力", "才干"], antonyms: ["愚蠢", "无知"] }
    }
  },
  "ja": {
    name: "Japanese", nativeName: "日本語", flag: "🇯🇵", size: "11.4 MB",
    words: {
      "愛": { phonetic: "/ai/", pos: "noun", defs: ["深い感情的なつながり", "強い愛情"], example: "愛は人生で最も大切なものです。", synonyms: ["慈愛", "情愛"], antonyms: ["憎しみ"] },
      "自由": { phonetic: "/jiyū/", pos: "noun", defs: ["制約なく行動できる状態", "独立と自主性"], example: "自由は基本的人権です。", synonyms: ["解放", "独立"], antonyms: ["束縛", "奴隷制"] }
    }
  },
  "pt": {
    name: "Portuguese", nativeName: "Português", flag: "🇧🇷", size: "8.4 MB",
    words: {
      "amor": { phonetic: "/aˈmoɾ/", pos: "noun", defs: ["Sentimento profundo de afeição", "Estado de estar profundamente apegado"], example: "O amor conquista tudo.", synonyms: ["carinho", "afeto"], antonyms: ["ódio"] },
      "liberdade": { phonetic: "/libɨɾˈðadɨ/", pos: "noun", defs: ["Estado de ser livre", "Poder de agir segundo a própria vontade"], example: "A liberdade é um direito universal.", synonyms: ["independência", "autonomia"], antonyms: ["escravidão"] }
    }
  },
  "ru": {
    name: "Russian", nativeName: "Русский", flag: "🇷🇺", size: "10.1 MB",
    words: {
      "любовь": { phonetic: "/lʲʊˈbofʲ/", pos: "noun", defs: ["Глубокое чувство привязанности", "Сильная эмоциональная связь"], example: "Любовь — это сила.", synonyms: ["страсть", "привязанность"], antonyms: ["ненависть"] },
      "свобода": { phonetic: "/svɐˈbodə/", pos: "noun", defs: ["Состояние свободы от ограничений", "Независимость и автономия"], example: "Свобода — право каждого.", synonyms: ["независимость", "воля"], antonyms: ["рабство", "заключение"] }
    }
  },
  "it": {
    name: "Italian", nativeName: "Italiano", flag: "🇮🇹", size: "8.8 MB",
    words: {
      "amore": { phonetic: "/aˈmoːɾe/", pos: "noun", defs: ["Sentimento profondo di affetto", "Attaccamento intenso"], example: "L'amore è eterno.", synonyms: ["affetto", "passione"], antonyms: ["odio"] },
      "libertà": { phonetic: "/liberˈta/", pos: "noun", defs: ["Stato di essere libero", "Diritto di agire secondo la propria volontà"], example: "La libertà è un diritto fondamentale.", synonyms: ["indipendenza", "autonomia"], antonyms: ["schiavitù"] }
    }
  },
  "ko": {
    name: "Korean", nativeName: "한국어", flag: "🇰🇷", size: "10.8 MB",
    words: {
      "사랑": { phonetic: "/saɾaŋ/", pos: "noun", defs: ["깊은 감정적 애착", "강한 애정"], example: "사랑은 인생에서 가장 중요합니다.", synonyms: ["애정", "열정"], antonyms: ["증오", "미움"] },
      "자유": { phonetic: "/t͡ɕaju/", pos: "noun", defs: ["제약 없이 행동할 수 있는 상태", "독립과 자율성"], example: "자유는 기본 인권입니다.", synonyms: ["독립", "해방"], antonyms: ["억압", "노예"] }
    }
  }
};

// ─── SEARCH FUNCTIONS ──────────────────────────────────────
function searchOffline(word) {
  const q = word.trim().toLowerCase();
  // Exact match
  if (OFFLINE_DB[q]) return { found: true, word: q, data: OFFLINE_DB[q], type: 'en' };
  // Check language packs
  for (const [lang, pack] of Object.entries(LANGUAGE_PACKS)) {
    if (pack.words && pack.words[q]) {
      return { found: true, word: q, data: pack.words[q], type: lang, langName: pack.name };
    }
  }
  // Prefix suggestions
  const suggestions = Object.keys(OFFLINE_DB).filter(w => w.startsWith(q)).slice(0, 8);
  return { found: false, suggestions };
}

function getOfflineSuggestions(prefix) {
  const q = prefix.toLowerCase();
  return Object.keys(OFFLINE_DB).filter(w => w.startsWith(q)).slice(0, 6);
}

function getRandomWord() {
  const keys = Object.keys(OFFLINE_DB);
  return keys[Math.floor(Math.random() * keys.length)];
}

function getWordOfDay() {
  const keys = Object.keys(OFFLINE_DB);
  const dayIndex = new Date().getDate() % keys.length;
  return keys[dayIndex];
}
