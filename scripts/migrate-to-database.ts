#!/usr/bin/env tsx

/**
 * Migration Script: localStorage to Supabase Database
 * 
 * This script helps migrate your existing localStorage data to the new Supabase database.
 * Run this after setting up your Supabase project and environment variables.
 */

import { teamService, blogService, contactService, newsletterService } from '../lib/database'
import { 
  getTeamMembers, 
  getBlogPosts, 
  getContactMessages, 
  getNewsletterSubscribers 
} from '../utils/adminData'

async function migrateData() {
  console.log('🚀 Starting data migration from localStorage to Supabase...')
  
  try {
    // Migrate Team Members
    console.log('\n📋 Migrating team members...')
    const teamMembers = getTeamMembers()
    for (const member of teamMembers) {
      await teamService.create({
        name: member.name,
        position: member.position,
        bio: member.bio,
        avatar: member.avatar,
        email: member.email,
        linkedin: member.linkedin,
        twitter: member.twitter,
        order: member.order,
        isActive: member.isActive
      })
      console.log(`✅ Migrated team member: ${member.name}`)
    }
    
    // Migrate Blog Posts
    console.log('\n📝 Migrating blog posts...')
    const blogPosts = getBlogPosts()
    for (const post of blogPosts) {
      await blogService.create({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        date: post.date,
        readTime: post.readTime,
        category: post.category,
        image: post.image,
        status: post.status
      })
      console.log(`✅ Migrated blog post: ${post.title}`)
    }
    
    // Migrate Contact Messages
    console.log('\n💬 Migrating contact messages...')
    const contactMessages = getContactMessages()
    for (const message of contactMessages) {
      await contactService.create({
        firstName: message.firstName,
        lastName: message.lastName,
        email: message.email,
        subject: message.subject,
        message: message.message
      })
      console.log(`✅ Migrated contact message from: ${message.firstName} ${message.lastName}`)
    }
    
    // Migrate Newsletter Subscribers
    console.log('\n📧 Migrating newsletter subscribers...')
    const subscribers = getNewsletterSubscribers()
    for (const subscriber of subscribers) {
      if (subscriber.isActive) {
        await newsletterService.subscribe(subscriber.email, subscriber.source)
        console.log(`✅ Migrated subscriber: ${subscriber.email}`)
      }
    }
    
    console.log('\n🎉 Migration completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`   Team Members: ${teamMembers.length}`)
    console.log(`   Blog Posts: ${blogPosts.length}`)
    console.log(`   Contact Messages: ${contactMessages.length}`)
    console.log(`   Newsletter Subscribers: ${subscribers.filter(s => s.isActive).length}`)
    
    console.log('\n⚠️  Next steps:')
    console.log('   1. Verify data in your Supabase dashboard')
    console.log('   2. Test admin panel functionality')
    console.log('   3. Update components to use database services')
    console.log('   4. Remove localStorage fallbacks when ready')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration if this script is executed directly
if (require.main === module) {
  migrateData()
}

export { migrateData } 