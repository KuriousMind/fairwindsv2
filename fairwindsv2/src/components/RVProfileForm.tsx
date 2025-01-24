'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import rvMakesData from '../../public/rv-makes.json'
import { useRouter } from 'next/navigation'
import { generateClient } from 'aws-amplify/data'
import { type Schema } from '@/amplify/data/resource'
import { useAuthenticator } from '@aws-amplify/ui-react'

type RVFormData = {
  make: string
  model: string
  year: number
  vin?: string
  notes?: string
}

export default function RVProfileForm(): React.ReactElement {
  const router = useRouter()
  const { user } = useAuthenticator()
  const client = generateClient<Schema>()
  
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<RVFormData>({
    defaultValues: {
      make: '',
      model: '',
      year: new Date().getFullYear(),
      vin: '',
      notes: ''
    }
  })

  const makeValue = watch('make')

  const [submitError, setSubmitError] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const onSubmit = async (data: RVFormData) => {
    try {
      setSubmitError(null)
      if (!user?.signInDetails?.loginId) {
        setSubmitError('User email not found. Please sign in again.')
        return
      }
      // Find the exact make from the list to ensure correct casing
      const exactMake = rvMakesData.makes.find(
        make => make.toLowerCase() === data.make.toLowerCase()
      )
      
      const rvData = {
        make: exactMake || data.make,
        model: data.model,
        year: Number(data.year), // Ensure year is a number
        vin: data.vin || null, // Use null instead of undefined
        notes: data.notes || null, // Use null instead of undefined
        ownerEmail: user.signInDetails.loginId
      }
      console.log('Submitting RV data:', rvData)
      const result = await client.models.RV.create(rvData)
      console.log('RV creation result:', result)
      router.push('/dashboard')
    } catch (error) {
      console.error('Error creating RV profile:', error)
      setSubmitError('Failed to create RV profile. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto p-6">
      <div>
        <label htmlFor="make" className="block text-sm font-medium text-gray-700">
          Make
        </label>
        <div className="relative">
          <input
            type="text"
            id="make"
            {...register('make', { 
              required: 'Make is required',
              validate: value => {
                if (!value.trim()) return 'Make is required';
                const isValidMake = rvMakesData.makes.some(
                  make => make.toLowerCase() === value.toLowerCase()
                );
                return isValidMake || 'Please select a valid RV make from the suggestions';
              }
            })}
            onChange={(e) => {
              const value = e.target.value;
              setValue('make', value, { shouldValidate: true });
              const filtered = value
                ? rvMakesData.makes.filter((make: string) => 
                    make.toLowerCase().includes(value.toLowerCase())
                  )
                : [];
              setSuggestions(filtered);
              setShowSuggestions(true);
            }}
            onFocus={() => {
              const filtered = makeValue 
                ? rvMakesData.makes.filter((make: string) => 
                    make.toLowerCase().includes(makeValue.toLowerCase())
                  )
                : rvMakesData.makes;
              setSuggestions(filtered);
              setShowSuggestions(true);
            }}
            onBlur={() => {
              // Delay hiding suggestions to allow for click handling
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
              {suggestions.map((make, index) => (
                <li
                  key={index}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setValue('make', make, { shouldValidate: true });
                    setSuggestions([]);
                    setShowSuggestions(false);
                  }}
                >
                  {make}
                </li>
              ))}
            </ul>
          )}
        </div>
        {errors.make && (
          <p className="mt-1 text-sm text-red-600">{errors.make.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="model" className="block text-sm font-medium text-gray-700">
          Model
        </label>
        <input
          type="text"
          id="model"
          {...register('model', { required: 'Model is required' })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.model && (
          <p className="mt-1 text-sm text-red-600">{errors.model.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">
          Year
        </label>
        <input
          type="number"
          id="year"
          {...register('year', { 
            required: 'Year is required',
            min: { value: 1900, message: 'Year must be 1900 or later' },
            max: { value: new Date().getFullYear() + 1, message: 'Invalid year' }
          })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.year && (
          <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="vin" className="block text-sm font-medium text-gray-700">
          VIN (Optional)
        </label>
        <input
          type="text"
          id="vin"
          {...register('vin', {
            pattern: {
              value: /^[A-HJ-NPR-Z0-9]{17}$/i,
              message: 'Please enter a valid 17-character VIN'
            }
          })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notes (Optional)
        </label>
        <textarea
          id="notes"
          {...register('notes')}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {submitError && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{submitError}</p>
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving...
          </>
        ) : (
          'Save RV Profile'
        )}
      </button>
    </form>
  )
}
