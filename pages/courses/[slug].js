import { useEffect, useState } from "react";
// import { Header } from "../../components/header";
import { useRouter } from "next/router";
import styles from "./course-page.module.scss";
// import ReactConfetti from "react-confetti";
import cx from "class-names";
import { useWeb3React } from "@web3-react/core";
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  courses,
  IMG_URL,
} from "../../constants/index";
import {Input, notification, Rate} from "antd";
import Image from 'next/image'
import backBtn from '../../public/arrow_back.svg';
import Link from 'next/link';
import flame from '../../public/flame.svg';
import point from '../../public/point.svg';
import reward from '../../public/Reward.png';
import coin from '../../public/icon_coin.svg';
import flash from '../../public/icon_flash.svg';
import arrowDown from '../../public/arrow_down.svg';

const INFO_STATE = "INFO_STATE";
const LEARN_STATE = "LEARN_STATE";
const SUBMIT_STATE = "SUBMIT_STATE";

const CoursePage = function () {
  const router = useRouter();

  const { active, account, library, connector, activate, deactivate, error } =
    useWeb3React();
  const { slug } = router.query;
  const currCourse = courses?.find((item) => item.id === slug);
  const [courseState, setCourseState] = useState(INFO_STATE);
  const [isRegister, setIsRegister] = useState(false);
  console.log(currCourse, active)


  return (
    <div className={styles.container}>
        <Link href="/profile">
            <a className={styles.back_btn}>
                <Image src={backBtn} />
                <p>Back to Courses</p>
            </a>
        </Link>
        <p className={styles.title}>{currCourse?.title}</p>
        <div className={styles.action_container}>
            <div onClick={() => setIsRegister(true)} className={cx({[styles.register]: true, [styles.registered]: isRegister})}>
                {isRegister ? 'Registered' : 'Register for free'}
            </div>
            <div className={styles.rating_container}>
                {isRegister
                    ? <>
                        <p className={styles.rate}>Rating</p>
                        <Rate defaultValue={3} character={({ index }) => <Image style={{ opacity: '0.4'}} src={flame} width={28} height={28}/>} />
                        </>
                    : <>
                        <Image src={flame}/>
                        <p className={styles.rating}>4.9</p>
                        <p className={styles.rating_count}>1 371 ratings</p>
                    </>
                }
            </div>
        </div>
        <div className={styles.content_container}>
            <div className={styles.part}>
                {!isRegister && <div className={styles.info_container}>
                    <p className={styles.info_title}>Description</p>
                    <p className={styles.info_desc}>{currCourse?.description}</p>
                </div>}
                <div className={styles.info_container}>
                    <p className={styles.info_title}>{isRegister ? 'Program' : 'What will you learn'}</p>
                    {currCourse?.lessons.map((item, index) => (
                        <div key={item.id} className={styles.lesson_container}>
                            <div className={styles.point_container}>
                                <Image src={point} />
                            </div>
                            {isRegister
                                ? <div>
                                    <p className={cx(styles.info_desc, styles.info_margin)}>{item.text}</p>
                                    <div className={styles.send_container}>
                                        <div className={styles.subject_btn}>
                                            <Image src={arrowDown} width={8} height={9} />
                                            <p className={styles.info_desc}>Subject</p>
                                        </div>
                                        {index === currCourse?.lessons.length - 1 && <div className={cx(styles.subject_btn, styles.send_btn)}>
                                            <Image style={{transform: 'rotate(180deg)'}} src={arrowDown} width={8} height={9} />
                                            <p className={styles.info_desc}>Send my answer</p>
                                        </div>}
                                    </div>
                                </div>
                                : <p className={cx(styles.info_desc, styles.info_margin)}>{item.text}</p>}
                        </div>
                    ))}
                </div>
                {!isRegister && <div className={styles.info_container}>
                    <p className={styles.info_title}>About specialization</p>
                    <p className={styles.info_desc}>{currCourse?.aboutSpec}</p>
                </div>}
            </div>
            <div className={styles.part}>
                <div className={styles.right_part_container}>
                    <p className={styles.info_title}>Reward</p>
                    <div className={styles.reward_container}>
                        <Image src={reward} />
                        <p className={styles.coin_text}>+ 121</p>
                        <Image src={coin} width={27} height={27} />
                    </div>
                </div>
                {!isRegister && <div className={styles.right_part_container}>
                    <p className={styles.info_title}>How to pass</p>
                    {currCourse?.toPass.map(item => (
                        <div key={item.id} className={styles.to_pass_container}>
                            <Image src={flash} height={28} width={28} />
                            <p className={styles.info_desc}>{item.text}</p>
                        </div>
                    ))}
                </div>}
                {!isRegister && <div className={styles.right_part_container}>
                    <p className={styles.info_title}>Skills will you gain</p>
                    <div className={styles.tag_container}>
                        {currCourse?.skills.map(item => (
                            <div key={item} className={styles.tag}>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>}
            </div>
        </div>
    </div>
  );
};

export default CoursePage;
