/* ===================== English self-test ===================== */
/* t: topic id, d: easy|medium|hard, q, o (4 options), c (correct index), e (explanation) */
const QB = [
{t:"s1",d:"easy",q:"A coin is tossed twice. How many outcomes are in the sample space?",o:["2","3","4","8"],c:2,e:"Each toss has 2 outcomes; by the multiplication rule 2 · 2 = 4: HH, HT, TH, TT."},
{t:"s1",d:"easy",q:"A die is rolled. Let A = {2, 4, 6} and B = {1, 2}. Which set is A ∩ B?",o:["{2}","{1, 2, 4, 6}","{4, 6}","∅"],c:0,e:"The intersection contains the outcomes that belong to both events. Only 2 is even and also in B."},
{t:"s1",d:"easy",q:"Two events A and B are mutually exclusive if",o:["A ∩ B = ∅","A ∪ B = S","P(A) = P(B)","A = Bᶜ"],c:0,e:"Mutually exclusive events cannot occur at the same time, so their intersection is the empty set."},
{t:"s1",d:"medium",q:"By De Morgan's law, (A ∪ B)ᶜ is equal to",o:["Aᶜ ∩ Bᶜ","Aᶜ ∪ Bᶜ","A ∩ B","Sᶜ"],c:0,e:"'Neither A nor B occurs' means A does not occur and B does not occur."},
{t:"s1",d:"medium",q:"Two dice are rolled. How many outcomes are in the event 'the sum is 9'?",o:["2","3","4","5"],c:2,e:"(3,6), (4,5), (5,4), (6,3). The dice are distinguishable, so (4,5) and (5,4) are different outcomes."},
{t:"s1",d:"hard",q:"Two dice are rolled. Let A = 'the sum is 9' and B = 'at least one die shows 5'. How many outcomes are in A ∩ B?",o:["1","2","3","4"],c:1,e:"A = {(3,6), (4,5), (5,4), (6,3)}. The outcomes that also contain a 5 are (4,5) and (5,4)."},

{t:"s2",d:"easy",q:"If P(A) = 0.3, then P(Aᶜ) is",o:["0.3","0.7","1.3","0"],c:1,e:"Complement rule: P(Aᶜ) = 1 − P(A) = 0.7."},
{t:"s2",d:"easy",q:"A and B are mutually exclusive with P(A) = 0.2 and P(B) = 0.5. Find P(A ∪ B).",o:["0.1","0.6","0.7","0.5"],c:2,e:"For mutually exclusive events the probabilities add (third axiom): 0.2 + 0.5 = 0.7."},
{t:"s2",d:"medium",q:"P(A) = 0.6, P(B) = 0.5 and P(A ∪ B) = 0.8. Find P(A ∩ B).",o:["0.1","0.3","0.2","0.4"],c:1,e:"Addition rule: P(A ∩ B) = P(A) + P(B) − P(A ∪ B) = 0.6 + 0.5 − 0.8 = 0.3."},
{t:"s2",d:"medium",q:"Which assignment of probabilities to the outcomes a, b and c violates the axioms of probability?",o:["0.5, 0.3, 0.2","0.6, 0.6, −0.2","1, 0, 0","0.25, 0.25, 0.5"],c:1,e:"A probability cannot be negative (first axiom). The other assignments are non-negative and sum to 1."},
{t:"s2",d:"hard",q:"P(A) = 0.5, P(B) = 0.4 and P(A ∩ B) = 0.15. What is the probability that exactly one of the two events occurs?",o:["0.75","0.6","0.45","0.9"],c:1,e:"P(exactly one) = P(A) + P(B) − 2 P(A ∩ B) = 0.5 + 0.4 − 0.3 = 0.6."},
{t:"s2",d:"hard",q:"In a lot, 12% of the parts have a dimensional defect, 8% have a surface defect and 3% have both. What is the probability that a randomly selected part has no defect?",o:["0.80","0.83","0.77","0.97"],c:1,e:"P(at least one defect) = 0.12 + 0.08 − 0.03 = 0.17, so P(no defect) = 1 − 0.17 = 0.83."},

{t:"s3",d:"easy",q:"In how many ways can 4 different books be arranged on a shelf?",o:["4","16","24","12"],c:2,e:"4! = 4 · 3 · 2 · 1 = 24, a permutation of all four objects."},
{t:"s3",d:"easy",q:"A committee of 3 people is to be selected from 10 people. How many different committees are possible?",o:["720","120","30","1000"],c:1,e:"Order does not matter, so use the combination C(10, 3) = 120."},
{t:"s3",d:"medium",q:"From 6 people, a president and a vice president are to be selected. In how many ways can this be done?",o:["15","30","36","720"],c:1,e:"Order matters because the two positions are different: P(6, 2) = 6 · 5 = 30."},
{t:"s3",d:"medium",q:"A 4-digit code uses the digits 0 to 9 and digits may be repeated. How many codes are possible?",o:["5040","10000","40","24"],c:1,e:"Multiplication rule: 10 · 10 · 10 · 10 = 10⁴ = 10000."},
{t:"s3",d:"hard",q:"A lot of 12 parts contains 4 defective parts. Three parts are selected at random without replacement. What is the probability that exactly one of them is defective?",o:["0.509","0.333","0.255","0.127"],c:0,e:"C(4, 1) · C(8, 2) / C(12, 3) = 4 · 28 / 220 = 112 / 220 ≈ 0.509."},
{t:"s3",d:"hard",q:"A team of 4 is selected at random from 3 industrial engineers and 5 mechanical engineers. What is the probability that the team contains at least one industrial engineer?",o:["13/14","3/7","1/14","1/2"],c:0,e:"Use the complement: P(no industrial engineer) = C(5, 4) / C(8, 4) = 5/70 = 1/14, so P(at least one) = 13/14."},

{t:"s4",d:"easy",q:"P(A ∩ B) = 0.12 and P(B) = 0.4. Find P(A | B).",o:["0.048","0.3","0.52","0.12"],c:1,e:"Definition of conditional probability: P(A | B) = P(A ∩ B) / P(B) = 0.12 / 0.4 = 0.3."},
{t:"s4",d:"easy",q:"A fair die is rolled and you are told that the result is even. What is the probability that it is a 6?",o:["1/6","1/3","1/2","2/3"],c:1,e:"The reduced sample space is {2, 4, 6}; one of the three equally likely outcomes is 6."},
{t:"s4",d:"medium",q:"A box contains 5 red and 3 blue balls. Two balls are drawn without replacement. What is the probability that both are blue?",o:["3/28","9/64","3/8","1/4"],c:0,e:"Multiplication rule: (3/8) · (2/7) = 6/56 = 3/28."},
{t:"s4",d:"medium",q:"Which statement is always true?",o:["P(A | B) = P(B | A)","P(A | B) = P(A ∩ B) / P(B) when P(B) > 0","P(A | B) = P(A) + P(B)","P(A | B) ≤ P(A)"],c:1,e:"This is the definition of conditional probability. In general P(A | B) and P(B | A) are different."},
{t:"s4",d:"hard",q:"Machine 1 produced 120 parts, 6 of them defective; machine 2 produced 80 parts, 10 of them defective. A part is selected at random and found to be non-defective. What is the probability that it came from machine 1?",o:["0.620","0.95","0.375","0.6"],c:0,e:"Condition on the non-defective column of the table: P(M1 | non-defective) = 114 / 184 ≈ 0.620."},
{t:"s4",d:"hard",q:"A box contains 4 good and 2 defective lamps. Three lamps are drawn without replacement. What is the probability that all three are good?",o:["1/5","8/27","1/3","2/5"],c:0,e:"General multiplication rule: (4/6) · (3/5) · (2/4) = 24/120 = 1/5. Equivalently C(4, 3) / C(6, 3) = 4/20."},

{t:"s5",d:"easy",q:"Machine 1 makes 60% of the parts with 2% defective; machine 2 makes 40% with 5% defective. What is the probability that a randomly selected part is defective?",o:["0.07","0.032","0.035","0.012"],c:1,e:"Law of total probability: 0.6 · 0.02 + 0.4 · 0.05 = 0.012 + 0.020 = 0.032."},
{t:"s5",d:"easy",q:"In the same setting, a part is found to be defective. What is the probability that it came from machine 1?",o:["0.6","0.012","0.375","0.02"],c:2,e:"Bayes' theorem: P(M1 | D) = 0.012 / 0.032 = 0.375."},
{t:"s5",d:"medium",q:"The events B₁, B₂, …, Bₙ form a partition of the sample space if",o:["they are mutually exclusive and their union is S","they are independent","they all have the same probability","each one is a subset of the next"],c:0,e:"A partition divides the sample space into disjoint pieces that together cover everything."},
{t:"s5",d:"medium",q:"P(B) = 0.3, P(A | B) = 0.8 and P(A | Bᶜ) = 0.2. Find P(A).",o:["0.38","0.5","0.24","1.0"],c:0,e:"Total probability: 0.8 · 0.3 + 0.2 · 0.7 = 0.24 + 0.14 = 0.38."},
{t:"s5",d:"hard",q:"A disease has a prevalence of 10%. The test detects the disease with probability 0.95 and gives a false positive with probability 0.10. If a person tests positive, what is the probability that the person actually has the disease?",o:["0.51","0.95","0.10","0.19"],c:0,e:"P(positive) = 0.1 · 0.95 + 0.9 · 0.10 = 0.185; P(disease | positive) = 0.095 / 0.185 ≈ 0.51."},
{t:"s5",d:"hard",q:"Three machines produce 50%, 30% and 20% of the output, with defective rates of 1%, 2% and 4%. A defective part is found. What is the probability that it was produced by the third machine?",o:["0.421","0.263","0.316","0.2"],c:0,e:"P(D) = 0.005 + 0.006 + 0.008 = 0.019; P(M3 | D) = 0.008 / 0.019 ≈ 0.421."},

{t:"s6",d:"easy",q:"A and B are independent with P(A) = 0.5 and P(B) = 0.4. Find P(A ∩ B).",o:["0.9","0.2","0.1","0"],c:1,e:"For independent events P(A ∩ B) = P(A) P(B) = 0.5 · 0.4 = 0.2."},
{t:"s6",d:"easy",q:"Two independent components, each working with probability 0.9, are connected in series. What is the reliability of the system?",o:["0.81","0.99","0.9","1.8"],c:0,e:"A series system works only if both components work: 0.9 · 0.9 = 0.81."},
{t:"s6",d:"medium",q:"P(A) = 0.3, P(B) = 0.5, and A and B are mutually exclusive. Are A and B independent?",o:["No, because P(A ∩ B) = 0 ≠ P(A) P(B)","Yes, because they cannot affect each other","Yes, because P(A) ≠ P(B)","It cannot be determined"],c:0,e:"Mutually exclusive events with positive probabilities are always dependent: if one occurs, the other cannot."},
{t:"s6",d:"medium",q:"Three independent components, each working with probability 0.8, are connected in parallel. What is the reliability of the system?",o:["0.992","0.512","0.8","0.96"],c:0,e:"The system fails only if all three components fail: 1 − 0.2³ = 0.992."},
{t:"s6",d:"hard",q:"Component A (0.9) is in series with a parallel block of B (0.8) and C (0.8). All components are independent. What is the reliability of the system?",o:["0.864","0.576","0.72","0.96"],c:0,e:"Parallel block: 1 − (0.2)(0.2) = 0.96; then the series product 0.9 · 0.96 = 0.864."},
{t:"s6",d:"hard",q:"If A and B are independent, which pair of events is also independent?",o:["A and Bᶜ","A and A ∩ B","A ∪ B and A","none of them"],c:0,e:"P(A ∩ Bᶜ) = P(A) − P(A) P(B) = P(A) P(Bᶜ), so A and Bᶜ are independent."},

{t:"s7",d:"easy",q:"A probability mass function has p(0) = 0.2, p(1) = 0.5 and p(2) = c. What is c?",o:["0.5","0.3","0.2","1"],c:1,e:"The probabilities of a pmf must sum to 1, so c = 1 − 0.7 = 0.3."},
{t:"s7",d:"easy",q:"A coin is tossed twice and X is the number of heads. Find F(1) = P(X ≤ 1).",o:["1/4","1/2","3/4","1"],c:2,e:"F(1) = p(0) + p(1) = 1/4 + 1/2 = 3/4."},
{t:"s7",d:"medium",q:"The pmf of X is p(1) = 0.2, p(2) = 0.3 and p(3) = 0.5. Find P(X ≥ 2).",o:["0.8","0.5","0.3","0.2"],c:0,e:"P(X ≥ 2) = p(2) + p(3) = 0.8, or equivalently 1 − F(1) = 1 − 0.2."},
{t:"s7",d:"medium",q:"For a discrete random variable with integer values, P(X < 3) is equal to",o:["F(2)","F(3)","1 − F(3)","p(3)"],c:0,e:"For integer values, X < 3 means X ≤ 2, so P(X < 3) = F(2)."},
{t:"s7",d:"hard",q:"A box has 4 good and 2 defective parts. Two parts are drawn without replacement and X is the number of defective parts. Find P(X = 1).",o:["8/15","1/3","1/15","2/5"],c:0,e:"C(2, 1) · C(4, 1) / C(6, 2) = 8/15. The draws are not independent, so you cannot simply multiply 2/6 and 4/6."},
{t:"s7",d:"hard",q:"Which of the following is NOT a property of a cumulative distribution function F(x)?",o:["F(x) can decrease as x increases","0 ≤ F(x) ≤ 1","F(x) approaches 1 as x goes to infinity","P(a < X ≤ b) = F(b) − F(a)"],c:0,e:"A cdf is non-decreasing: it never goes down as x increases."},

{t:"s8",d:"easy",q:"X takes the values 0 and 2, each with probability 0.5. Find E[X].",o:["0","1","2","0.5"],c:1,e:"E[X] = 0 · 0.5 + 2 · 0.5 = 1."},
{t:"s8",d:"easy",q:"E[X] = 3 and Var(X) = 4. For Y = 2X + 1, find E[Y] and Var(Y).",o:["7 and 16","7 and 9","6 and 8","7 and 8"],c:0,e:"E[Y] = 2 · 3 + 1 = 7 and Var(Y) = 2² · 4 = 16; the constant 1 does not change the variance."},
{t:"s8",d:"medium",q:"X takes the values 0 and 2, each with probability 0.5. Find Var(X).",o:["1","2","0.5","0.25"],c:0,e:"E[X²] = 0 · 0.5 + 4 · 0.5 = 2, so Var(X) = E[X²] − (E[X])² = 2 − 1 = 1."},
{t:"s8",d:"medium",q:"The standard deviation of X is 5. What is Var(3X)?",o:["15","45","225","75"],c:2,e:"Var(X) = 25 and Var(3X) = 3² · Var(X) = 9 · 25 = 225."},
{t:"s8",d:"hard",q:"X = −10 with probability 0.2, X = 0 with probability 0.5 and X = 20 with probability 0.3. Find Var(X).",o:["124","140","16","108"],c:0,e:"E[X] = −2 + 0 + 6 = 4; E[X²] = 20 + 0 + 120 = 140; Var(X) = 140 − 16 = 124."},
{t:"s8",d:"hard",q:"A venture gives a profit of 50 with probability 0.6, a profit of 10 with probability 0.3 or a loss of 80 with probability 0.1 (in thousand TL). Find the expected profit.",o:["25","30","35","21"],c:0,e:"E[X] = 0.6 · 50 + 0.3 · 10 + 0.1 · (−80) = 30 + 3 − 8 = 25 thousand TL."},

{t:"s9",d:"easy",q:"X has a binomial distribution with n = 20 and p = 0.3. Find E[X].",o:["0.3","6","4.2","20"],c:1,e:"The mean of a binomial random variable is np = 20 · 0.3 = 6."},
{t:"s9",d:"easy",q:"A fair coin is tossed 4 times. What is the probability of exactly 2 heads?",o:["0.375","0.25","0.5","0.0625"],c:0,e:"C(4, 2) · (0.5)² · (0.5)² = 6/16 = 0.375."},
{t:"s9",d:"medium",q:"10% of the parts are defective. Five parts are selected independently. What is the probability of at least one defective part?",o:["0.41","0.59","0.33","0.5"],c:0,e:"P(at least one) = 1 − P(X = 0) = 1 − 0.9⁵ = 1 − 0.590 = 0.41."},
{t:"s9",d:"medium",q:"Which condition is NOT required for a binomial experiment?",o:["The trials are sampled without replacement from a small lot","The number of trials is fixed","Each trial has only two outcomes","The probability of success is the same in each trial"],c:0,e:"Sampling without replacement from a small lot violates independence; a binomial experiment requires independent trials."},
{t:"s9",d:"hard",q:"X has a binomial distribution with n = 10 and p = 0.2. Find P(X ≤ 1).",o:["0.376","0.268","0.107","0.624"],c:0,e:"P(X = 0) + P(X = 1) = 0.8¹⁰ + 10 · 0.2 · 0.8⁹ = 0.107 + 0.268 = 0.376."},
{t:"s9",d:"hard",q:"A machine produces 5% defective parts. Boxes of 20 parts are accepted if they contain at most one defective part. What is the probability that a box is accepted?",o:["0.736","0.358","0.377","0.264"],c:0,e:"P(X ≤ 1) = 0.95²⁰ + 20 · 0.05 · 0.95¹⁹ ≈ 0.358 + 0.377 = 0.736."},

{t:"s10",d:"easy",q:"The probability of success in each trial is 0.25. What is the expected number of trials until the first success?",o:["0.25","4","3","12"],c:1,e:"For a geometric random variable E[X] = 1/p = 1/0.25 = 4."},
{t:"s10",d:"easy",q:"The probability of success in each trial is 0.2. What is the probability that the first success occurs on the third trial?",o:["0.128","0.2","0.16","0.512"],c:0,e:"(1 − p)² · p = 0.8² · 0.2 = 0.128: two failures and then a success."},
{t:"s10",d:"medium",q:"The probability of success in each trial is 0.3. What is the probability that more than 3 trials are needed to obtain the first success?",o:["0.343","0.657","0.147","0.3"],c:0,e:"P(X > 3) = (1 − p)³ = 0.7³ = 0.343: the first three trials all fail."},
{t:"s10",d:"medium",q:"The lack of memory property of the geometric distribution states that",o:["P(X > m + n | X > m) = P(X > n)","P(X > m + n) = P(X > m) + P(X > n)","E[X] = 1/p","P(X = k) decreases as k increases"],c:0,e:"Past failures do not change the distribution of the number of additional trials that are needed."},
{t:"s10",d:"hard",q:"A test device makes an error on each part with probability 0.1, independently. The first 4 parts were classified correctly. What is the probability that the next 2 parts are also classified correctly?",o:["0.81","0.531","0.9","0.19"],c:0,e:"By the lack of memory property, P(X > 6 | X > 4) = P(X > 2) = 0.9² = 0.81."},
{t:"s10",d:"hard",q:"X is a geometric random variable with p = 0.1. What is the variance of X?",o:["90","10","0.9","100"],c:0,e:"Var(X) = (1 − p) / p² = 0.9 / 0.01 = 90."},

{t:"s11",d:"easy",q:"Calls arrive according to a Poisson process at a rate of 3 per hour. What is λ for a period of 2 hours?",o:["6","3","1.5","9"],c:0,e:"λ = rate × length of the interval = 3 · 2 = 6."},
{t:"s11",d:"easy",q:"X has a Poisson distribution with λ = 2. Find P(X = 1).",o:["0.135","0.271","0.5","0.2"],c:1,e:"P(X = 1) = e⁻² · 2¹ / 1! = 0.1353 · 2 ≈ 0.271."},
{t:"s11",d:"medium",q:"The number of flaws in a cable follows a Poisson distribution with a mean of 3 flaws per 100 metres. What is the probability of at least one flaw in 100 metres?",o:["0.950","0.050","0.149","0.199"],c:0,e:"P(X ≥ 1) = 1 − P(X = 0) = 1 − e⁻³ ≈ 1 − 0.0498 = 0.950."},
{t:"s11",d:"medium",q:"For a Poisson random variable with parameter λ, which statement is true?",o:["E[X] = Var(X) = λ","E[X] = λ and Var(X) = λ²","E[X] = 1/λ","X takes values from 0 to λ"],c:0,e:"The mean and the variance of a Poisson distribution are both equal to λ."},
{t:"s11",d:"hard",q:"A fabric has on average 0.4 flaws per square metre. What is the probability that a piece of 5 square metres has at most one flaw?",o:["0.406","0.271","0.135","0.594"],c:0,e:"λ = 0.4 · 5 = 2, so P(X ≤ 1) = e⁻² (1 + 2) ≈ 0.406."},
{t:"s11",d:"hard",q:"There are 200 independent parts, each defective with probability 0.01. Using the Poisson approximation, what is the probability of exactly 2 defective parts?",o:["0.271","0.135","0.180","0.090"],c:0,e:"λ = np = 200 · 0.01 = 2, so P(X = 2) = e⁻² · 2² / 2! ≈ 0.271."}
];

/* Key terms per topic (English → Turkish), shown in the test setup */
const KEYTERMS = {
 s1:[["random experiment","rastgele deney"],["sample space","örnek uzayı"],["outcome","sonuç"],["event","olay"],["union","birleşim"],["intersection","kesişim"],["complement","tümleyen"],["mutually exclusive","ayrık"],["De Morgan's laws","De Morgan kuralları"]],
 s2:[["axiom","aksiyom"],["complement rule","tümleyen kuralı"],["addition rule","toplama kuralı"],["equally likely","eşit olasılıklı"],["exactly one","tam olarak biri"]],
 s3:[["multiplication rule","çarpma kuralı"],["permutation","permütasyon"],["combination","kombinasyon"],["factorial","faktöriyel"],["without replacement","geri koymadan"],["at random","rastgele"]],
 s4:[["conditional probability","koşullu olasılık"],["given","verildiğinde / bilindiğine göre"],["reduced sample space","indirgenmiş örnek uzayı"],["multiplication rule","çarpma kuralı"],["defective","kusurlu"],["non-defective","kusursuz / sağlam"]],
 s5:[["law of total probability","toplam olasılık kuralı"],["Bayes' theorem","Bayes teoremi"],["partition","parçalanış"],["prior","önsel"],["posterior","sonsal"],["false positive","yanlış pozitif"],["prevalence","yaygınlık / sıklık"]],
 s6:[["independent","bağımsız"],["dependent","bağımlı"],["reliability","güvenilirlik"],["series","seri"],["parallel","paralel"],["component","bileşen"]],
 s7:[["random variable","rastgele değişken"],["discrete","kesikli"],["probability mass function (pmf)","olasılık kütle fonksiyonu"],["cumulative distribution function (cdf)","birikimli dağılım fonksiyonu"],["non-decreasing","azalmayan"]],
 s8:[["expected value / mean","beklenen değer / ortalama"],["variance","varyans"],["standard deviation","standart sapma"],["profit","kâr"],["loss","zarar"]],
 s9:[["Bernoulli trial","Bernoulli denemesi"],["binomial distribution","binom dağılımı"],["success / failure","başarı / başarısızlık"],["trial","deneme"],["at least / at most","en az / en fazla"]],
 s10:[["geometric distribution","geometrik dağılım"],["first success","ilk başarı"],["lack of memory (memoryless)","hafızasızlık"],["additional","ek / ilave"]],
 s11:[["Poisson process","Poisson süreci"],["rate","hız"],["interval","aralık"],["flaw","hata / kusur"],["approximation","yaklaşım"],["per","başına"]]
};

const TS = { sel:new Set(T.map(t=>t.id)), diff:"all", n:10, qs:[], i:0, ans:[], started:false, done:false };
const DIFF_EN = {easy:["easy","done"],medium:["medium","en"],hard:["hard","fut"]};

function wrapWords(s){
  return esc(s).replace(/[A-Za-z][A-Za-z'’\-]*[A-Za-z]|[A-Za-z]/g, w=>{ const k=w.toLowerCase().replace(/[’']/g,"'"); return (w.length>1 && DICT[k]!=null) ? `<span class="w" data-w="${esc(k)}">${w}</span>` : w; });
}
function renderTest(){
  const L=$("#lesson");
  if(!TS.started){
    L.innerHTML = `<div class="meta"><span class="pill en">Self-test · in English</span></div><h2>Kendini test et</h2>
    <p class="prose" style="color:var(--muted);margin:0 0 14px">Sorular ve cevaplar sınavdaki gibi <b>İngilizce</b>. Anlamadığın kelimeye <b>tıkla</b>, kelime Türkçesiyle değişir; tekrar tıklarsan İngilizcesine döner. Hangi konulardan soru geleceğini seç.</p>
    <h3 style="margin-top:0">Konular</h3>
    <div class="trow"><button class="icon-btn" type="button" data-ts="all">Tümünü seç</button><button class="icon-btn" type="button" data-ts="none">Hiçbirini seçme</button>
      <label class="tl">Şu konuya kadar: <select id="tsUpto"><option value="">—</option>${T.map((t,i)=>`<option value="${i}">${i+1}. ${esc(t.title)}</option>`).join("")}</select></label></div>
    <div class="tgrid">${T.map((t,i)=>`<label class="tchk ${TS.sel.has(t.id)?"on":""}"><input type="checkbox" data-tid="${t.id}" ${TS.sel.has(t.id)?"checked":""}> <span class="n">${String(i+1).padStart(2,"0")}</span><span><b>${esc(t.en)}</b><br><small>${esc(t.title)}</small></span></label>`).join("")}</div>
    <div class="trow" style="margin-top:14px">
      <label class="tl">Zorluk: <select id="tsDiff"><option value="all" ${TS.diff==="all"?"selected":""}>hepsi</option><option value="easy" ${TS.diff==="easy"?"selected":""}>easy</option><option value="medium" ${TS.diff==="medium"?"selected":""}>medium</option><option value="hard" ${TS.diff==="hard"?"selected":""}>hard</option></select></label>
      <label class="tl">Soru sayısı: <select id="tsN"><option value="5" ${TS.n===5?"selected":""}>5</option><option value="10" ${TS.n===10?"selected":""}>10</option><option value="20" ${TS.n===20?"selected":""}>20</option><option value="999" ${TS.n===999?"selected":""}>hepsi</option></select></label>
      <span class="scinfo" id="tsCount"></span>
    </div>
    <div style="margin-top:14px"><button class="btn" type="button" id="tsStart">Testi başlat →</button></div>
    <h3>Seçili konuların anahtar terimleri</h3>
    <div class="terms" id="tsTerms"></div>`;
    updateTestSetup();
    return;
  }
  if(TS.done){ renderTestResult(); return; }
  const q=TS.qs[TS.i], a=TS.ans[TS.i], t=T.find(x=>x.id===q.t), ti=T.indexOf(t);
  L.innerHTML = `<div class="meta"><span class="pill en">Question ${TS.i+1} / ${TS.qs.length}</span><span class="pill ${DIFF_EN[q.d][1]}">${DIFF_EN[q.d][0]}</span><span class="pill fut">${ti+1}. ${esc(t.en)}</span></div>
  <div class="tq"><p class="tq-q">${wrapWords(q.q)}</p>
  <div class="topts">${q.o.map((o,i)=>`<button type="button" class="topt ${a==null?"":(i===q.c?"right":(i===a?"wrong":""))}" data-o="${i}" ${a!=null?"disabled":""}><span class="n">${"ABCD"[i]}</span><span>${wrapWords(o)}</span></button>`).join("")}</div>
  ${a!=null?`<div class="texp ${a===q.c?"ok":"no"}"><b>${a===q.c?"Correct.":"Incorrect."}</b> ${wrapWords(q.e)}</div>`:""}
  <div class="trow" style="margin-top:14px">${a!=null?`<button class="btn" type="button" id="tsNext">${TS.i<TS.qs.length-1?"Next question →":"See results →"}</button>`:""}<button class="btn ghost" type="button" id="tsAsk">Bu soruyu asistana sor</button><button class="icon-btn" type="button" id="tsQuit">Testi bitir</button></div>
  <p class="scinfo" style="margin:10px 0 0">İpucu: kelimeye tıkla → Türkçesiyle değişir; tekrar tıkla → İngilizcesi.</p></div>`;
}
function updateTestSetup(){
  const pool = QB.filter(q=>TS.sel.has(q.t) && (TS.diff==="all"||q.d===TS.diff));
  const c=$("#tsCount"); if(c) c.textContent = `${pool.length} uygun soru`;
  const tm=$("#tsTerms"); if(tm) tm.innerHTML = T.filter(t=>TS.sel.has(t.id)).map(t=>`<div class="tgroup"><b>${esc(t.en)}</b>${(KEYTERMS[t.id]||[]).map(([e,tr])=>`<span class="term"><span>${esc(e)}</span><span class="tr">${esc(tr)}</span></span>`).join("")}</div>`).join("") || `<p class="scinfo">Konu seç.</p>`;
  document.querySelectorAll(".tchk").forEach(l=>l.classList.toggle("on", l.querySelector("input").checked));
}
function startTest(){
  let pool = QB.filter(q=>TS.sel.has(q.t) && (TS.diff==="all"||q.d===TS.diff));
  if(!pool.length) return;
  pool = pool.map(q=>({q,r:Math.random()})).sort((a,b)=>a.r-b.r).map(x=>x.q);
  pool.sort((a,b)=>T.findIndex(t=>t.id===a.t)-T.findIndex(t=>t.id===b.t));
  if(TS.n<999){ const by={}; pool.forEach(q=>{(by[q.t]=by[q.t]||[]).push(q)}); const ids=Object.keys(by); const out=[]; let k=0; while(out.length<TS.n && out.length<pool.length){ const id=ids[k%ids.length]; const nx=by[id].shift(); if(nx) out.push(nx); k++; } pool=out; }
  TS.qs=pool; TS.i=0; TS.ans=new Array(pool.length).fill(null); TS.started=true; TS.done=false;
  renderTest(); renderChips(); $("#ctxLine").textContent="Test modu · soruyu Türkçe açıklar";
}
function renderTestResult(){
  const n=TS.qs.length, ok=TS.ans.filter((a,i)=>a===TS.qs[i].c).length;
  const byT={}; TS.qs.forEach((q,i)=>{ const b=byT[q.t]=byT[q.t]||{n:0,ok:0}; b.n++; if(TS.ans[i]===q.c) b.ok++; });
  const wrong=TS.qs.map((q,i)=>({q,i})).filter(x=>TS.ans[x.i]!==x.q.c);
  $("#lesson").innerHTML = `<div class="meta"><span class="pill en">Results</span></div><h2>${ok} / ${n} correct <span style="color:var(--muted);font-size:1rem;font-weight:400">(${Math.round(ok/n*100)}%)</span></h2>
  <div class="tgrid" style="margin-top:10px">${Object.entries(byT).map(([id,b])=>{const t=T.find(x=>x.id===id); return `<div class="tchk"><span class="n">${b.ok}/${b.n}</span><span><b>${esc(t.en)}</b><br><small>${esc(t.title)}</small></span></div>`}).join("")}</div>
  ${wrong.length?`<h3>Yanlış cevapladıkların</h3><div style="display:grid;gap:10px">${wrong.map(({q,i})=>`<div class="tq small"><p class="tq-q">${wrapWords(q.q)}</p><p><b>Answer:</b> ${wrapWords(q.o[q.c])}</p><p class="scinfo">${wrapWords(q.e)}</p><button class="icon-btn" type="button" data-askq="${i}">Asistana sor</button></div>`).join("")}</div>`:`<p class="prose">Hepsi doğru. Zorluğu “hard” yapıp tekrar dene.</p>`}
  <div class="trow" style="margin-top:16px"><button class="btn" type="button" id="tsAgain">Yeni test</button></div>`;
}
function testContext(){
  const q = TS.started && !TS.done ? TS.qs[TS.i] : null;
  if(!q) return `Öğrenci TEST MODUNDA (İngilizce çoktan seçmeli sorular). Soruları Türkçe açıkla, İngilizce terimleri parantez içinde koru. Konular: ${T.filter(t=>TS.sel.has(t.id)).map(t=>t.en).join(", ")}.`;
  const t=T.find(x=>x.id===q.t);
  return `Öğrenci TEST MODUNDA. Ekrandaki İngilizce soru (konu: ${t.title} / ${t.en}, zorluk: ${q.d}):
SORU: ${q.q}
ŞIKLAR: ${q.o.map((o,i)=>`${"ABCD"[i]}) ${o}`).join("  ")}
DOĞRU ŞIK: ${"ABCD"[q.c]}) ${q.o[q.c]}
AÇIKLAMA: ${q.e}
Öğrenci şu şıkkı seçti: ${TS.ans[TS.i]==null?"henüz seçmedi (cevabı doğrudan verme; ipucu ver)":("ABCD"[TS.ans[TS.i]]+(TS.ans[TS.i]===q.c?" (doğru)":" (yanlış)"))}.
Soruyu ve çözümü Türkçe, adım adım açıkla; İngilizce terimleri parantez içinde koru. Öğrenci kelime sorarsa İngilizce kelimenin Türkçesini ve olasılıktaki anlamını ver.
${topicContext(t)}`;
}
/* events */
$("#lesson").addEventListener("click", e=>{
  if(mode!=="test") return;
  const w=e.target.closest(".w"); if(w){ toggleWord(w); return; }
  const ts=e.target.closest("[data-ts]"); if(ts){ if(ts.dataset.ts==="all") TS.sel=new Set(T.map(t=>t.id)); else TS.sel.clear(); renderTest(); return; }
  if(e.target.id==="tsStart"){ startTest(); return; }
  const o=e.target.closest(".topt"); if(o && TS.ans[TS.i]==null){ TS.ans[TS.i]=+o.dataset.o; renderTest(); return; }
  if(e.target.id==="tsNext"){ if(TS.i<TS.qs.length-1){ TS.i++; } else { TS.done=true; } renderTest(); window.scrollTo({top:0,behavior:"smooth"}); return; }
  if(e.target.id==="tsQuit"){ TS.done=true; renderTest(); return; }
  if(e.target.id==="tsAgain"){ TS.started=false; TS.done=false; renderTest(); return; }
  if(e.target.id==="tsAsk"){ send("Ekrandaki test sorusunu Türkçe açıklar mısın? Önce soruyu Türkçeye çevir, sonra adım adım çöz."); focusTutor(); return; }
  const aq=e.target.closest("[data-askq]"); if(aq){ TS.i=+aq.dataset.askq; TS.done=false; const q=TS.qs[TS.i]; send(`Şu soruyu yanlış yaptım, Türkçe açıklar mısın?\n\n${q.q}\nŞıklar: ${q.o.map((o,i)=>"ABCD"[i]+") "+o).join("  ")}\nBenim cevabım: ${"ABCD"[TS.ans[TS.i]]||"boş"}`); TS.done=true; focusTutor(); return; }
});
$("#lesson").addEventListener("change", e=>{
  if(mode!=="test") return;
  const cb=e.target.closest("input[data-tid]"); if(cb){ if(cb.checked) TS.sel.add(cb.dataset.tid); else TS.sel.delete(cb.dataset.tid); updateTestSetup(); return; }
  if(e.target.id==="tsUpto"){ if(e.target.value!==""){ const k=+e.target.value; TS.sel=new Set(T.slice(0,k+1).map(t=>t.id)); renderTest(); } return; }
  if(e.target.id==="tsDiff"){ TS.diff=e.target.value; updateTestSetup(); return; }
  if(e.target.id==="tsN"){ TS.n=+e.target.value; return; }
});
function toggleWord(el){
  if(el.classList.contains("tr-on")){ el.textContent=el.dataset.en; el.classList.remove("tr-on"); return; }
  const k=el.dataset.w; const full=DICT[k]||""; const short=full.split(" (")[0].split(" / ")[0];
  el.dataset.en=el.textContent; el.textContent=short||full; el.classList.add("tr-on");
}
let wordPop=null;
function showWord(el){
  hideWord(); const k=el.dataset.w; const tr=DICT[k];
  wordPop=document.createElement("div"); wordPop.className="wpop"; wordPop.innerHTML=`<b>${esc(k)}</b><span>${esc(tr||"(sözlükte yok)")}</span>`;
  document.body.appendChild(wordPop);
  const r=el.getBoundingClientRect(); const pw=wordPop.offsetWidth; let x=r.left+window.scrollX; if(x+pw>window.innerWidth-16) x=window.innerWidth-16-pw; wordPop.style.left=Math.max(8,x)+"px"; wordPop.style.top=(r.bottom+window.scrollY+6)+"px";
  el.classList.add("hl");
}
function hideWord(){ if(wordPop){ wordPop.remove(); wordPop=null; } document.querySelectorAll(".w.hl").forEach(x=>x.classList.remove("hl")); }
document.addEventListener("click", e=>{ if(!e.target.closest(".w") && !e.target.closest(".wpop")) hideWord(); });
