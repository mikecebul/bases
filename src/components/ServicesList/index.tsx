import { IconWithBorder } from '@/components/Icons/Icon'
import type { Service } from '@/payload-types'
import { RichText } from '@/components/RichText'
import * as motion from 'motion/react-client'

const contentVariants = {
  hidden: { opacity: 0, x: 'var(--service-from-x)' },
  visible: { opacity: 1, x: 0 },
}

const reducedMotionClasses = 'motion-reduce:opacity-100! motion-reduce:transform-none!'

export function ServicesList({ services }: { services: Service[] }) {
  return (
    <motion.dl
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 'some' }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
      className="grid max-w-xl grid-cols-1 gap-y-10 md:mx-auto lg:max-w-none lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16 xl:grid-cols-3 [--service-from-x:30px] lg:[--service-from-x:0px]"
    >
      {services?.map((service) => (
        <motion.div
          key={service.id}
          variants={{ hidden: {}, visible: {} }}
          className="relative pl-16 text-left"
        >
          <dt className="text-base font-semibold leading-7 text-primary">
            {/* Keep the icon outside the text's opacity and transform animations. */}
            <div className="absolute top-0 left-0">
              <IconWithBorder name={service.icon ?? 'Check'} color="white" />
            </div>
            <motion.span
              variants={contentVariants}
              transition={{ duration: 0.4 }}
              className={`block ${reducedMotionClasses}`}
            >
              {service.title}
            </motion.span>
          </dt>
          <motion.dd
            variants={contentVariants}
            transition={{ duration: 0.4 }}
            className={`mt-2 text-base leading-7 text-muted-foreground ${reducedMotionClasses}`}
          >
            {service.description ? (
              <RichText
                paragraphClassName="text-muted-foreground [&_a]:underline-offset-2"
                data={service.description}
              />
            ) : (
              (service.desc ?? 'TBA')
            )}
          </motion.dd>
        </motion.div>
      ))}
    </motion.dl>
  )
}
