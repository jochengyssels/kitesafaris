import { LLMService } from './llm-service'
import { KitespotData } from './kitespot-schema'

export interface TestQuestion {
  id: string
  category: 'trip_fit' | 'sizing' | 'safety' | 'compare' | 'logistics' | 'general'
  question: string
  expectedElements: string[]
  expectedTools?: string[]
  expectedCTAs?: string[]
  acceptanceRules: {
    mustInclude: string[]
    mustNotInclude?: string[]
    responseTime?: number // max ms
    minConfidence?: number
  }
  correctAnswer?: string
}

export interface TestResult {
  questionId: string
  question: string
  category: string
  response: string
  responseTime: number
  score: number
  maxScore: number
  details: {
    groundedness: number
    toolUse: number
    ctaPresence: number
    latency: number
    confidence: number
  }
  passed: boolean
  timestamp: Date
}

export class KAIteTestSuite {
  private llmService: LLMService
  private testQuestions: TestQuestion[]

  constructor(kitespots: KitespotData[]) {
    this.llmService = new LLMService(kitespots)
    this.testQuestions = this.generateTestQuestions()
  }

  private generateTestQuestions(): TestQuestion[] {
    return [
      // TRIP FIT QUESTIONS (15 questions)
      {
        id: 'trip_fit_001',
        category: 'trip_fit',
        question: 'Intermediate, €2500 budget, February.',
        expectedElements: ['Antigua', 'Cape Verde', 'wind stats', '€2400-2500'],
        expectedCTAs: ['Book', 'Compare', 'WhatsApp'],
        acceptanceRules: {
          mustInclude: ['Antigua', 'Cape Verde', '€2400', '€2500', 'February', 'intermediate'],
          responseTime: 3000
        }
      },
      {
        id: 'trip_fit_002',
        category: 'trip_fit',
        question: 'Beginner, €1500 budget, July.',
        expectedElements: ['beginner', '€1500', 'July', 'suitable destinations'],
        expectedCTAs: ['Book', 'Learn more'],
        acceptanceRules: {
          mustInclude: ['beginner', '€1500', 'July'],
          mustNotInclude: ['advanced', '€3000']
        }
      },
      {
        id: 'trip_fit_003',
        category: 'trip_fit',
        question: 'Advanced rider, wave riding, €4000 budget, December.',
        expectedElements: ['advanced', 'wave riding', '€4000', 'December', 'wave spots'],
        expectedCTAs: ['Book', 'Compare'],
        acceptanceRules: {
          mustInclude: ['advanced', 'wave', '€4000', 'December']
        }
      },
      {
        id: 'trip_fit_004',
        category: 'trip_fit',
        question: 'Looking for flat water freestyle, intermediate level, March.',
        expectedElements: ['flat water', 'freestyle', 'intermediate', 'March'],
        expectedCTAs: ['Book', 'More info'],
        acceptanceRules: {
          mustInclude: ['flat water', 'freestyle', 'intermediate', 'March']
        }
      },
      {
        id: 'trip_fit_005',
        category: 'trip_fit',
        question: 'Group of 6, mixed levels, €2000 per person, May.',
        expectedElements: ['group', '6 people', 'mixed levels', '€2000', 'May'],
        expectedCTAs: ['Book', 'Group discount'],
        acceptanceRules: {
          mustInclude: ['group', '€2000', 'May']
        }
      },
      {
        id: 'trip_fit_006',
        category: 'trip_fit',
        question: 'Solo traveler, beginner, first time, €1800 budget.',
        expectedElements: ['solo', 'beginner', 'first time', '€1800'],
        expectedCTAs: ['Book', 'Beginner package'],
        acceptanceRules: {
          mustInclude: ['beginner', '€1800']
        }
      },
      {
        id: 'trip_fit_007',
        category: 'trip_fit',
        question: 'Family with kids, beginner parents, €3000 total, August.',
        expectedElements: ['family', 'kids', 'beginner', '€3000', 'August'],
        expectedCTAs: ['Family package', 'Book'],
        acceptanceRules: {
          mustInclude: ['family', 'beginner', '€3000', 'August']
        }
      },
      {
        id: 'trip_fit_008',
        category: 'trip_fit',
        question: 'Advanced freestyle, looking for consistent wind, €3500, October.',
        expectedElements: ['advanced', 'freestyle', 'consistent wind', '€3500', 'October'],
        expectedCTAs: ['Book', 'Wind forecast'],
        acceptanceRules: {
          mustInclude: ['advanced', 'freestyle', '€3500', 'October']
        }
      },
      {
        id: 'trip_fit_009',
        category: 'trip_fit',
        question: 'Wave riding, advanced, €5000 budget, any month.',
        expectedElements: ['wave riding', 'advanced', '€5000'],
        expectedCTAs: ['Book', 'Compare'],
        acceptanceRules: {
          mustInclude: ['wave', 'advanced', '€5000']
        }
      },
      {
        id: 'trip_fit_010',
        category: 'trip_fit',
        question: 'Beginner, flat water only, €1200 budget, flexible dates.',
        expectedElements: ['beginner', 'flat water', '€1200'],
        expectedCTAs: ['Book', 'Beginner spots'],
        acceptanceRules: {
          mustInclude: ['beginner', 'flat water', '€1200']
        }
      },
      {
        id: 'trip_fit_011',
        category: 'trip_fit',
        question: 'Intermediate, want to learn tricks, €2800, June.',
        expectedElements: ['intermediate', 'tricks', '€2800', 'June'],
        expectedCTAs: ['Book', 'Freestyle package'],
        acceptanceRules: {
          mustInclude: ['intermediate', '€2800', 'June']
        }
      },
      {
        id: 'trip_fit_012',
        category: 'trip_fit',
        question: 'Advanced, big air, €4500, September.',
        expectedElements: ['advanced', 'big air', '€4500', 'September'],
        expectedCTAs: ['Book', 'Big air spots'],
        acceptanceRules: {
          mustInclude: ['advanced', '€4500', 'September']
        }
      },
      {
        id: 'trip_fit_013',
        category: 'trip_fit',
        question: 'Beginner, warm water, €1600, November.',
        expectedElements: ['beginner', 'warm water', '€1600', 'November'],
        expectedCTAs: ['Book', 'Warm destinations'],
        acceptanceRules: {
          mustInclude: ['beginner', '€1600', 'November']
        }
      },
      {
        id: 'trip_fit_014',
        category: 'trip_fit',
        question: 'Intermediate, want to progress to advanced, €3200, April.',
        expectedElements: ['intermediate', 'progress', 'advanced', '€3200', 'April'],
        expectedCTAs: ['Book', 'Progression package'],
        acceptanceRules: {
          mustInclude: ['intermediate', '€3200', 'April']
        }
      },
      {
        id: 'trip_fit_015',
        category: 'trip_fit',
        question: 'Advanced, foil riding, €4000, flexible dates.',
        expectedElements: ['advanced', 'foil', '€4000'],
        expectedCTAs: ['Book', 'Foil package'],
        acceptanceRules: {
          mustInclude: ['advanced', 'foil', '€4000']
        }
      },

      // SIZING QUESTIONS (10 questions)
      {
        id: 'sizing_001',
        category: 'sizing',
        question: '75kg, 18-22 knots, twin-tip.',
        expectedElements: ['9m', '12m', '75kg', '18-22 knots'],
        acceptanceRules: {
          mustInclude: ['9m', '12m', '75kg', '18-22 knots'],
          mustNotInclude: ['15m', '6m']
        }
      },
      {
        id: 'sizing_002',
        category: 'sizing',
        question: '90kg, 12-15 knots, freestyle.',
        expectedElements: ['12m', '15m', '90kg', '12-15 knots'],
        acceptanceRules: {
          mustInclude: ['12m', '15m', '90kg', '12-15 knots']
        }
      },
      {
        id: 'sizing_003',
        category: 'sizing',
        question: '65kg, 25-30 knots, wave riding.',
        expectedElements: ['7m', '9m', '65kg', '25-30 knots'],
        acceptanceRules: {
          mustInclude: ['7m', '9m', '65kg', '25-30 knots']
        }
      },
      {
        id: 'sizing_004',
        category: 'sizing',
        question: '80kg, 8-12 knots, beginner.',
        expectedElements: ['15m', '17m', '80kg', '8-12 knots'],
        acceptanceRules: {
          mustInclude: ['15m', '17m', '80kg', '8-12 knots']
        }
      },
      {
        id: 'sizing_005',
        category: 'sizing',
        question: '100kg, 20-25 knots, intermediate.',
        expectedElements: ['10m', '12m', '100kg', '20-25 knots'],
        acceptanceRules: {
          mustInclude: ['10m', '12m', '100kg', '20-25 knots']
        }
      },
      {
        id: 'sizing_006',
        category: 'sizing',
        question: '70kg, 15-18 knots, foil.',
        expectedElements: ['10m', '12m', '70kg', '15-18 knots', 'foil'],
        acceptanceRules: {
          mustInclude: ['10m', '12m', '70kg', '15-18 knots']
        }
      },
      {
        id: 'sizing_007',
        category: 'sizing',
        question: '85kg, 6-10 knots, big kite.',
        expectedElements: ['17m', '19m', '85kg', '6-10 knots'],
        acceptanceRules: {
          mustInclude: ['17m', '19m', '85kg', '6-10 knots']
        }
      },
      {
        id: 'sizing_008',
        category: 'sizing',
        question: '60kg, 30+ knots, small kite.',
        expectedElements: ['6m', '7m', '60kg', '30+ knots'],
        acceptanceRules: {
          mustInclude: ['6m', '7m', '60kg', '30+ knots']
        }
      },
      {
        id: 'sizing_009',
        category: 'sizing',
        question: '95kg, 14-16 knots, all-around.',
        expectedElements: ['12m', '14m', '95kg', '14-16 knots'],
        acceptanceRules: {
          mustInclude: ['12m', '14m', '95kg', '14-16 knots']
        }
      },
      {
        id: 'sizing_010',
        category: 'sizing',
        question: '55kg, 22-28 knots, advanced.',
        expectedElements: ['8m', '10m', '55kg', '22-28 knots'],
        acceptanceRules: {
          mustInclude: ['8m', '10m', '55kg', '22-28 knots']
        }
      },

      // SAFETY QUESTIONS (10 questions)
      {
        id: 'safety_001',
        category: 'safety',
        question: 'Beginner in waves?',
        expectedElements: ['caution', 'lesson', 'instructor', 'waves'],
        expectedCTAs: ['Lessons', 'Safe spots'],
        acceptanceRules: {
          mustInclude: ['caution', 'lesson', 'instructor'],
          mustNotInclude: ['go for it', 'no problem']
        }
      },
      {
        id: 'safety_002',
        category: 'safety',
        question: 'First time kitesurfing, what should I know?',
        expectedElements: ['lessons', 'safety', 'instructor', 'beginner'],
        expectedCTAs: ['Beginner course', 'Safety info'],
        acceptanceRules: {
          mustInclude: ['lessons', 'safety', 'instructor']
        }
      },
      {
        id: 'safety_003',
        category: 'safety',
        question: 'Is it safe to kite alone?',
        expectedElements: ['buddy', 'safety', 'alone', 'risky'],
        expectedCTAs: ['Find buddy', 'Safety tips'],
        acceptanceRules: {
          mustInclude: ['buddy', 'safety', 'risky']
        }
      },
      {
        id: 'safety_004',
        category: 'safety',
        question: 'What wind is too strong for beginners?',
        expectedElements: ['20+ knots', 'strong', 'beginner', 'dangerous'],
        expectedCTAs: ['Wind limits', 'Beginner spots'],
        acceptanceRules: {
          mustInclude: ['20+ knots', 'strong', 'beginner']
        }
      },
      {
        id: 'safety_005',
        category: 'safety',
        question: 'Offshore wind safety?',
        expectedElements: ['offshore', 'dangerous', 'avoid', 'onshore'],
        expectedCTAs: ['Wind safety', 'Safe spots'],
        acceptanceRules: {
          mustInclude: ['offshore', 'dangerous', 'avoid']
        }
      },
      {
        id: 'safety_006',
        category: 'safety',
        question: 'Equipment safety check?',
        expectedElements: ['check', 'lines', 'kite', 'harness', 'safety'],
        expectedCTAs: ['Safety checklist', 'Equipment check'],
        acceptanceRules: {
          mustInclude: ['check', 'lines', 'kite', 'harness']
        }
      },
      {
        id: 'safety_007',
        category: 'safety',
        question: 'Storm approaching, should I kite?',
        expectedElements: ['storm', 'dangerous', 'stop', 'safety'],
        expectedCTAs: ['Weather safety', 'Stop kiting'],
        acceptanceRules: {
          mustInclude: ['storm', 'dangerous', 'stop']
        }
      },
      {
        id: 'safety_008',
        category: 'safety',
        question: 'Crowded spot safety?',
        expectedElements: ['crowded', 'space', 'rules', 'safety'],
        expectedCTAs: ['Spot rules', 'Safety tips'],
        acceptanceRules: {
          mustInclude: ['crowded', 'space', 'rules']
        }
      },
      {
        id: 'safety_009',
        category: 'safety',
        question: 'Night kiting safety?',
        expectedElements: ['night', 'dangerous', 'avoid', 'visibility'],
        expectedCTAs: ['Day kiting', 'Safety info'],
        acceptanceRules: {
          mustInclude: ['night', 'dangerous', 'avoid']
        }
      },
      {
        id: 'safety_010',
        category: 'safety',
        question: 'Injury prevention tips?',
        expectedElements: ['warm up', 'stretch', 'technique', 'safety'],
        expectedCTAs: ['Safety tips', 'Injury prevention'],
        acceptanceRules: {
          mustInclude: ['warm up', 'stretch', 'technique']
        }
      },

      // COMPARE QUESTIONS (10 questions)
      {
        id: 'compare_001',
        category: 'compare',
        question: 'Antigua vs Dakhla in March.',
        expectedElements: ['Antigua', 'Dakhla', 'March', 'comparison', 'table'],
        expectedCTAs: ['Book Antigua', 'Book Dakhla', 'Compare'],
        acceptanceRules: {
          mustInclude: ['Antigua', 'Dakhla', 'March']
        }
      },
      {
        id: 'compare_002',
        category: 'compare',
        question: 'Caribbean vs Greece for beginners.',
        expectedElements: ['Caribbean', 'Greece', 'beginner', 'comparison'],
        expectedCTAs: ['Book Caribbean', 'Book Greece', 'Compare'],
        acceptanceRules: {
          mustInclude: ['Caribbean', 'Greece', 'beginner']
        }
      },
      {
        id: 'compare_003',
        category: 'compare',
        question: 'Tarifa vs Fuerteventura wind conditions.',
        expectedElements: ['Tarifa', 'Fuerteventura', 'wind', 'conditions'],
        expectedCTAs: ['Book Tarifa', 'Book Fuerteventura', 'Compare'],
        acceptanceRules: {
          mustInclude: ['Tarifa', 'Fuerteventura', 'wind']
        }
      },
      {
        id: 'compare_004',
        category: 'compare',
        question: 'Brazil vs Egypt for wave riding.',
        expectedElements: ['Brazil', 'Egypt', 'wave riding', 'comparison'],
        expectedCTAs: ['Book Brazil', 'Book Egypt', 'Compare'],
        acceptanceRules: {
          mustInclude: ['Brazil', 'Egypt', 'wave']
        }
      },
      {
        id: 'compare_005',
        category: 'compare',
        question: 'Australia vs New Zealand kitesurfing.',
        expectedElements: ['Australia', 'New Zealand', 'kitesurfing', 'comparison'],
        expectedCTAs: ['Book Australia', 'Book New Zealand', 'Compare'],
        acceptanceRules: {
          mustInclude: ['Australia', 'New Zealand']
        }
      },
      {
        id: 'compare_006',
        category: 'compare',
        question: 'Aruba vs Bonaire flat water.',
        expectedElements: ['Aruba', 'Bonaire', 'flat water', 'comparison'],
        expectedCTAs: ['Book Aruba', 'Book Bonaire', 'Compare'],
        acceptanceRules: {
          mustInclude: ['Aruba', 'Bonaire', 'flat water']
        }
      },
      {
        id: 'compare_007',
        category: 'compare',
        question: 'Spain vs Portugal for intermediate riders.',
        expectedElements: ['Spain', 'Portugal', 'intermediate', 'comparison'],
        expectedCTAs: ['Book Spain', 'Book Portugal', 'Compare'],
        acceptanceRules: {
          mustInclude: ['Spain', 'Portugal', 'intermediate']
        }
      },
      {
        id: 'compare_008',
        category: 'compare',
        question: 'Mauritius vs Maldives for advanced.',
        expectedElements: ['Mauritius', 'Maldives', 'advanced', 'comparison'],
        expectedCTAs: ['Book Mauritius', 'Book Maldives', 'Compare'],
        acceptanceRules: {
          mustInclude: ['Mauritius', 'Maldives', 'advanced']
        }
      },
      {
        id: 'compare_009',
        category: 'compare',
        question: 'Cape Verde vs Canary Islands wind.',
        expectedElements: ['Cape Verde', 'Canary Islands', 'wind', 'comparison'],
        expectedCTAs: ['Book Cape Verde', 'Book Canary Islands', 'Compare'],
        acceptanceRules: {
          mustInclude: ['Cape Verde', 'Canary Islands', 'wind']
        }
      },
      {
        id: 'compare_010',
        category: 'compare',
        question: 'Thailand vs Philippines for beginners.',
        expectedElements: ['Thailand', 'Philippines', 'beginner', 'comparison'],
        expectedCTAs: ['Book Thailand', 'Book Philippines', 'Compare'],
        acceptanceRules: {
          mustInclude: ['Thailand', 'Philippines', 'beginner']
        }
      },

      // LOGISTICS QUESTIONS (10 questions)
      {
        id: 'logistics_001',
        category: 'logistics',
        question: 'How to bring gear on ITA Airways?',
        expectedElements: ['ITA Airways', 'gear', 'policy', 'baggage'],
        expectedCTAs: ['Airline policy', 'Gear transport'],
        acceptanceRules: {
          mustInclude: ['ITA Airways', 'gear', 'policy']
        }
      },
      {
        id: 'logistics_002',
        category: 'logistics',
        question: 'Best way to transport kite gear?',
        expectedElements: ['transport', 'gear', 'baggage', 'airline'],
        expectedCTAs: ['Gear transport', 'Travel tips'],
        acceptanceRules: {
          mustInclude: ['transport', 'gear', 'baggage']
        }
      },
      {
        id: 'logistics_003',
        category: 'logistics',
        question: 'Travel insurance for kitesurfing?',
        expectedElements: ['insurance', 'kitesurfing', 'travel', 'coverage'],
        expectedCTAs: ['Insurance info', 'Travel insurance'],
        acceptanceRules: {
          mustInclude: ['insurance', 'kitesurfing', 'travel']
        }
      },
      {
        id: 'logistics_004',
        category: 'logistics',
        question: 'Visa requirements for kitesurfing trips?',
        expectedElements: ['visa', 'requirements', 'travel', 'passport'],
        expectedCTAs: ['Visa info', 'Travel requirements'],
        acceptanceRules: {
          mustInclude: ['visa', 'requirements', 'travel']
        }
      },
      {
        id: 'logistics_005',
        category: 'logistics',
        question: 'What to pack for kitesurfing trip?',
        expectedElements: ['pack', 'gear', 'clothes', 'essentials'],
        expectedCTAs: ['Packing list', 'Trip essentials'],
        acceptanceRules: {
          mustInclude: ['pack', 'gear', 'clothes']
        }
      },
      {
        id: 'logistics_006',
        category: 'logistics',
        question: 'Renting vs bringing own gear?',
        expectedElements: ['renting', 'own gear', 'pros', 'cons'],
        expectedCTAs: ['Gear rental', 'Bring gear'],
        acceptanceRules: {
          mustInclude: ['renting', 'own gear', 'pros', 'cons']
        }
      },
      {
        id: 'logistics_007',
        category: 'logistics',
        question: 'Best time to book kitesurfing trips?',
        expectedElements: ['booking', 'time', 'advance', 'season'],
        expectedCTAs: ['Book now', 'Best deals'],
        acceptanceRules: {
          mustInclude: ['booking', 'time', 'advance']
        }
      },
      {
        id: 'logistics_008',
        category: 'logistics',
        question: 'Group vs solo kitesurfing trips?',
        expectedElements: ['group', 'solo', 'pros', 'cons'],
        expectedCTAs: ['Group trips', 'Solo trips'],
        acceptanceRules: {
          mustInclude: ['group', 'solo', 'pros', 'cons']
        }
      },
      {
        id: 'logistics_009',
        category: 'logistics',
        question: 'How to find kitesurfing buddies?',
        expectedElements: ['buddies', 'find', 'community', 'safety'],
        expectedCTAs: ['Find buddies', 'Community'],
        acceptanceRules: {
          mustInclude: ['buddies', 'find', 'community']
        }
      },
      {
        id: 'logistics_010',
        category: 'logistics',
        question: 'Budget planning for kitesurfing trip?',
        expectedElements: ['budget', 'planning', 'costs', 'expenses'],
        expectedCTAs: ['Budget calculator', 'Cost breakdown'],
        acceptanceRules: {
          mustInclude: ['budget', 'planning', 'costs']
        }
      },

      // GENERAL QUESTIONS (5 questions)
      {
        id: 'general_001',
        category: 'general',
        question: 'What is kitesurfing?',
        expectedElements: ['kitesurfing', 'wind', 'water', 'sport'],
        expectedCTAs: ['Learn more', 'Get started'],
        acceptanceRules: {
          mustInclude: ['kitesurfing', 'wind', 'water']
        }
      },
      {
        id: 'general_002',
        category: 'general',
        question: 'How to get started with kitesurfing?',
        expectedElements: ['lessons', 'beginner', 'instructor', 'start'],
        expectedCTAs: ['Beginner course', 'Get started'],
        acceptanceRules: {
          mustInclude: ['lessons', 'beginner', 'instructor']
        }
      },
      {
        id: 'general_003',
        category: 'general',
        question: 'Best kitesurfing destinations?',
        expectedElements: ['destinations', 'best', 'spots', 'worldwide'],
        expectedCTAs: ['Explore destinations', 'Book trip'],
        acceptanceRules: {
          mustInclude: ['destinations', 'best', 'spots']
        }
      },
      {
        id: 'general_004',
        category: 'general',
        question: 'Kitesurfing equipment needed?',
        expectedElements: ['equipment', 'kite', 'board', 'harness'],
        expectedCTAs: ['Equipment guide', 'Buy gear'],
        acceptanceRules: {
          mustInclude: ['equipment', 'kite', 'board', 'harness']
        }
      },
      {
        id: 'general_005',
        category: 'general',
        question: 'Kitesurfing vs windsurfing?',
        expectedElements: ['kitesurfing', 'windsurfing', 'difference', 'comparison'],
        expectedCTAs: ['Learn kitesurfing', 'Compare sports'],
        acceptanceRules: {
          mustInclude: ['kitesurfing', 'windsurfing', 'difference']
        }
      }
    ]
  }

  async runTest(questionId: string): Promise<TestResult> {
    const question = this.testQuestions.find(q => q.id === questionId)
    if (!question) {
      throw new Error(`Question ${questionId} not found`)
    }

    const startTime = Date.now()
    const response = await this.llmService.processQuery(question.question)
    const responseTime = Date.now() - startTime

    const result = this.evaluateResponse(question, response, responseTime)
    return result
  }

  async runAllTests(): Promise<TestResult[]> {
    const results: TestResult[] = []
    
    for (const question of this.testQuestions) {
      try {
        const result = await this.runTest(question.id)
        results.push(result)
      } catch (error) {
        console.error(`Error running test ${question.id}:`, error)
        results.push({
          questionId: question.id,
          question: question.question,
          category: question.category,
          response: 'Error occurred',
          responseTime: 0,
          score: 0,
          maxScore: 100,
          details: {
            groundedness: 0,
            toolUse: 0,
            ctaPresence: 0,
            latency: 0,
            confidence: 0
          },
          passed: false,
          timestamp: new Date()
        })
      }
    }

    return results
  }

  private evaluateResponse(question: TestQuestion, response: any, responseTime: number): TestResult {
    const responseText = response.response || ''
    const confidence = response.confidence || 0

    // Evaluate groundedness (0-25 points)
    const groundedness = this.evaluateGroundedness(question, responseText)

    // Evaluate tool use (0-25 points)
    const toolUse = this.evaluateToolUse(question, response)

    // Evaluate CTA presence (0-25 points)
    const ctaPresence = this.evaluateCTAPresence(question, response)

    // Evaluate latency (0-25 points)
    const latency = this.evaluateLatency(question, responseTime)

    const totalScore = groundedness + toolUse + ctaPresence + latency
    const maxScore = 100
    const passed = totalScore >= 70 && this.checkAcceptanceRules(question, responseText)

    return {
      questionId: question.id,
      question: question.question,
      category: question.category,
      response: responseText,
      responseTime,
      score: totalScore,
      maxScore,
      details: {
        groundedness,
        toolUse,
        ctaPresence,
        latency,
        confidence
      },
      passed,
      timestamp: new Date()
    }
  }

  private evaluateGroundedness(question: TestQuestion, responseText: string): number {
    let score = 0
    const maxScore = 25

    // Check if response includes expected elements
    const expectedElements = question.expectedElements || []
    const foundElements = expectedElements.filter(element => 
      responseText.toLowerCase().includes(element.toLowerCase())
    )

    score += (foundElements.length / expectedElements.length) * 15

    // Check if response avoids forbidden elements
    const forbiddenElements = question.acceptanceRules.mustNotInclude || []
    const foundForbidden = forbiddenElements.filter(element => 
      responseText.toLowerCase().includes(element.toLowerCase())
    )

    if (foundForbidden.length === 0) {
      score += 10
    }

    return Math.min(score, maxScore)
  }

  private evaluateToolUse(question: TestQuestion, response: any): number {
    let score = 0
    const maxScore = 25

    // Check if expected tools were used
    const expectedTools = question.expectedTools || []
    if (expectedTools.length === 0) {
      score = maxScore // No specific tools expected
    } else {
      // This would need to be implemented based on actual tool usage tracking
      score = maxScore * 0.8 // Placeholder
    }

    return score
  }

  private evaluateCTAPresence(question: TestQuestion, response: any): number {
    let score = 0
    const maxScore = 25

    const expectedCTAs = question.expectedCTAs || []
    const actualCTAs = response.ctaButtons || []

    if (expectedCTAs.length === 0) {
      score = maxScore // No CTAs expected
    } else {
      const foundCTAs = expectedCTAs.filter(expectedCTA => 
        actualCTAs.some((cta: any) => 
          cta.text.toLowerCase().includes(expectedCTA.toLowerCase())
        )
      )

      score = (foundCTAs.length / expectedCTAs.length) * maxScore
    }

    return score
  }

  private evaluateLatency(question: TestQuestion, responseTime: number): number {
    const maxScore = 25
    const maxAllowedTime = question.acceptanceRules.responseTime || 5000

    if (responseTime <= maxAllowedTime) {
      return maxScore
    } else {
      return Math.max(0, maxScore - ((responseTime - maxAllowedTime) / 1000) * 5)
    }
  }

  private checkAcceptanceRules(question: TestQuestion, responseText: string): boolean {
    const rules = question.acceptanceRules

    // Check must include elements
    const mustInclude = rules.mustInclude || []
    const foundMustInclude = mustInclude.filter(element => 
      responseText.toLowerCase().includes(element.toLowerCase())
    )

    if (foundMustInclude.length < mustInclude.length) {
      return false
    }

    // Check must not include elements
    const mustNotInclude = rules.mustNotInclude || []
    const foundMustNotInclude = mustNotInclude.filter(element => 
      responseText.toLowerCase().includes(element.toLowerCase())
    )

    if (foundMustNotInclude.length > 0) {
      return false
    }

    return true
  }

  generateReport(results: TestResult[]): string {
    const totalTests = results.length
    const passedTests = results.filter(r => r.passed).length
    const passRate = (passedTests / totalTests) * 100

    const categoryStats = this.getCategoryStats(results)
    const avgResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / totalTests
    const avgScore = results.reduce((sum, r) => sum + r.score, 0) / totalTests

    return `
# kAIte Test Suite Report
Generated: ${new Date().toISOString()}

## Overall Results
- **Total Tests**: ${totalTests}
- **Passed**: ${passedTests}
- **Pass Rate**: ${passRate.toFixed(1)}%
- **Average Score**: ${avgScore.toFixed(1)}/100
- **Average Response Time**: ${avgResponseTime.toFixed(0)}ms

## Category Breakdown
${Object.entries(categoryStats).map(([category, stats]) => `
### ${category}
- Pass Rate: ${stats.passRate.toFixed(1)}%
- Average Score: ${stats.avgScore.toFixed(1)}/100
- Tests: ${stats.total}/${stats.passed} passed
`).join('')}

## Failed Tests
${results.filter(r => !r.passed).map(r => `
- **${r.questionId}**: ${r.question}
  - Score: ${r.score}/100
  - Category: ${r.category}
  - Response: ${r.response.substring(0, 100)}...
`).join('')}

## Performance Issues
${results.filter(r => r.responseTime > 3000).map(r => `
- **${r.questionId}**: ${r.responseTime}ms (${r.question})
`).join('')}
    `.trim()
  }

  private getCategoryStats(results: TestResult[]): Record<string, any> {
    const categories = [...new Set(results.map(r => r.category))]
    
    return categories.reduce((stats, category) => {
      const categoryResults = results.filter(r => r.category === category)
      const passed = categoryResults.filter(r => r.passed).length
      const total = categoryResults.length
      const avgScore = categoryResults.reduce((sum, r) => sum + r.score, 0) / total

      stats[category] = {
        passRate: (passed / total) * 100,
        avgScore,
        total,
        passed
      }

      return stats
    }, {} as Record<string, any>)
  }
}
