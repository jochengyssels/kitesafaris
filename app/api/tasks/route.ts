import { NextRequest, NextResponse } from 'next/server'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  console.error('[Tasks API] Missing required environment variables')
}

export async function GET() {
  try {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { error: 'Missing Airtable configuration' },
        { status: 500 }
      )
    }

    console.log('[Tasks API] Fetching tasks from Airtable...')
    
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Tasks`,
      {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      console.error('[Tasks API] Airtable request failed:', response.status, response.statusText)
      return NextResponse.json(
        { error: 'Failed to fetch tasks from Airtable' },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('[Tasks API] Successfully fetched tasks:', data.records?.length || 0)

    // Transform Airtable records to our format
    const tasks = data.records?.map((record: any) => {
      const fields = record.fields || {}
      return {
        id: record.id,
        title: fields['Task Name'] || fields.title || '',
        description: fields['Description'] || fields.description || '',
        status: fields['Status'] || fields.status || 'Not Started',
        priority: fields['Priority'] || fields.priority || 'Medium',
        assignee: fields['Assignee'] || fields.assignee || '',
        dueDate: fields['Due Date'] || fields.due_date || null,
        createdDate: fields['Created Date'] || fields.created_date || null,
        lastModified: fields['Last Modified'] || fields.last_modified || null,
        tags: fields['Tags'] || fields.tags || [],
        progress: fields['Progress'] || fields.progress || 0,
        category: fields['Category'] || fields.category || '',
        estimatedHours: fields['Estimated Hours'] || fields.estimated_hours || null,
        actualHours: fields['Actual Hours'] || fields.actual_hours || null,
        notes: fields['Notes'] || fields.notes || '',
        page: fields['Page'] || fields.page || [],
        // Include all raw fields for flexibility
        rawFields: fields
      }
    }) || []

    return NextResponse.json({ tasks })
  } catch (error) {
    console.error('[Tasks API] Error fetching tasks:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { error: 'Missing Airtable configuration' },
        { status: 500 }
      )
    }

    const body = await request.json()
    console.log('[Tasks API] Creating new task:', body)

    const airtableFields: any = {
      'Task Name': body.title,
      'Description': body.description,
      'Status': body.status,
      'Priority': body.priority,
      'Page': body.page,
    }

    // Remove null/undefined values and only keep fields that exist in Airtable
    const validFields = ['Task Name', 'Description', 'Status', 'Priority', 'Page']
    Object.keys(airtableFields).forEach(key => {
      if (airtableFields[key] === null || airtableFields[key] === undefined || !validFields.includes(key)) {
        delete airtableFields[key]
      }
    })

    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Tasks`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: airtableFields
        })
      }
    )

    if (!response.ok) {
      console.error('[Tasks API] Failed to create task:', response.status, response.statusText)
      return NextResponse.json(
        { error: 'Failed to create task in Airtable' },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('[Tasks API] Successfully created task:', data.id)

    return NextResponse.json({ 
      success: true, 
      task: {
        id: data.id,
        ...body
      }
    })
  } catch (error) {
    console.error('[Tasks API] Error creating task:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { error: 'Missing Airtable configuration' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Task ID is required' },
        { status: 400 }
      )
    }

    console.log('[Tasks API] Updating task:', id, updateData)

    const airtableFields: any = {
      'Task Name': updateData.title,
      'Description': updateData.description,
      'Status': updateData.status,
      'Priority': updateData.priority,
      'Page': updateData.page,
    }

    // Remove null/undefined values and only keep fields that exist in Airtable
    const validFields = ['Task Name', 'Description', 'Status', 'Priority', 'Page']
    Object.keys(airtableFields).forEach(key => {
      if (airtableFields[key] === null || airtableFields[key] === undefined || !validFields.includes(key)) {
        delete airtableFields[key]
      }
    })

    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Tasks/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: airtableFields
        })
      }
    )

    if (!response.ok) {
      console.error('[Tasks API] Failed to update task:', response.status, response.statusText)
      return NextResponse.json(
        { error: 'Failed to update task in Airtable' },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('[Tasks API] Successfully updated task:', id)

    return NextResponse.json({ 
      success: true, 
      task: {
        id,
        ...updateData
      }
    })
  } catch (error) {
    console.error('[Tasks API] Error updating task:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { error: 'Missing Airtable configuration' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Task ID is required' },
        { status: 400 }
      )
    }

    console.log('[Tasks API] Deleting task:', id)

    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Tasks/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    )

    if (!response.ok) {
      console.error('[Tasks API] Failed to delete task:', response.status, response.statusText)
      return NextResponse.json(
        { error: 'Failed to delete task from Airtable' },
        { status: response.status }
      )
    }

    console.log('[Tasks API] Successfully deleted task:', id)

    return NextResponse.json({ 
      success: true,
      message: 'Task deleted successfully'
    })
  } catch (error) {
    console.error('[Tasks API] Error deleting task:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
