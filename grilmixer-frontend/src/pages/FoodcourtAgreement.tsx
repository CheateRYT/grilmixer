import Footer from '../components/Footer'
import Header from '../components/Header'

const FoodcourtAgreement = () => {
	return (
		<div className='foodcourt'>
			<Header shopId='1' logo='Гриль-МикСер' shopTag='foodcourt' />
			<div className='flex-grow p-6 overflow-y-auto'>
				<h1 className='text-3xl font-bold mb-4'>Пользовательское соглашение</h1>

				<div className='space-y-6'>
					<h2 className='text-2xl font-semibold'>1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
					<p>
						1.1. Настоящее Пользовательское соглашение (далее – Соглашение)
						относится к сайту Индивидуального предпринимателя Даштамирова Сергея
						Арамовича, расположенному по адресу{' '}
						<a
							href='https://грильмиксер.рф/foodcourt'
							className='text-red-500 underline'
						>
							https://грильмиксер.рф/foodcourt
						</a>{' '}
						(далее – Сайт).
					</p>
					<p>
						1.2. Сайт Индивидуального предпринимателя Даштамирова Сергея
						Арамовича (далее – Сайт) является собственностью юридического лица
						Индивидуальный предприниматель Даштамиров Сергей Арамович
						(Ростовская область, г. Таганрог, ул. Транспортная, д. 46, ИНН
						615400254587, ОГРНИП 323619600249920).
					</p>
					<p>
						1.3. Настоящее Соглашение регулирует отношения между Администрацией
						сайта Индивидуального предпринимателя Даштамирова Сергея Арамовича
						(далее – Администрация сайта) и Пользователем данного Сайта.
					</p>
					<p>
						1.4. Администрация сайта оставляет за собой право в любое время
						изменять, добавлять или удалять пункты настоящего Соглашения без
						уведомления Пользователя.
					</p>
					<p>
						1.5. Использование Сайта Пользователем означает принятие Соглашения
						и изменений, внесенных в настоящее Соглашение.
					</p>
					<p>
						1.6. Пользователь несет персональную ответственность за проверку
						настоящего Соглашения на наличие изменений в нем.
					</p>

					<h2 className='text-2xl font-semibold'>2. ОПРЕДЕЛЕНИЯ ТЕРМИНОВ</h2>
					<p>
						2.1. Перечисленные ниже термины имеют для целей настоящего
						Соглашения следующее значение:
					</p>
					<p>
						2.1.1. Индивидуальный предприниматель Даштамиров Сергей Арамович –
						Интернет-ресурс, расположенный на доменном имени{' '}
						<a
							href='https://грильмиксер.рф/foodcourt'
							className='text-red-500 underline'
						>
							https://грильмиксер.рф/foodcourt
						</a>
						, осуществляющий свою деятельность посредством Интернет-ресурса и
						сопутствующих ему сервисов (далее - Сайт).
					</p>
					<p>
						2.1.2. Сайт – сайт, содержащий информацию о Товарах и/или Услугах
						и/или Иных ценностях для пользователя, Продавце и/или Исполнителе
						услуг, позволяющий осуществить выбор, заказ и (или) приобретение
						Товара, и/или получение услуги.
					</p>
					<p>
						2.1.3. Администрация сайта – уполномоченные сотрудники на управления
						Сайтом, действующие от имени Индивидуального предпринимателя
						Даштамирова Сергея Арамовича.
					</p>
					<p>
						2.1.4. Пользователь сайта (далее - Пользователь) – лицо, имеющее
						доступ к Сайту, посредством сети Интернет и использующее Сайт.
					</p>
					<p>
						2.1.5. Содержание сайта (далее – Содержание) - охраняемые результаты
						интеллектуальной деятельности, включая тексты литературных
						произведений, их названия, предисловия, аннотации, статьи,
						иллюстрации, обложки, музыкальные произведения с текстом или без
						текста, графические, текстовые, фотографические, производные,
						составные и иные произведения, пользовательские интерфейсы,
						визуальные интерфейсы, названия товарных знаков, логотипы, программы
						для ЭВМ, базы данных, а также дизайн, структура, выбор, координация,
						внешний вид, общий стиль и расположение данного Содержания,
						входящего в состав Сайта и другие объекты интеллектуальной
						собственности все вместе и/или по отдельности, содержащиеся на сайте{' '}
						<a
							href='https://грильмиксер.рф/foodcourt'
							className='text-red-500 underline'
						>
							https://грильмиксер.рф/foodcourt
						</a>
						.
					</p>

					<h2 className='text-2xl font-semibold'>3. ПРЕДМЕТ СОГЛАШЕНИЯ</h2>
					<p>
						3.1. Предметом настоящего Соглашения является предоставление
						Пользователю доступа к содержащимся на Сайте Товарам и/или
						оказываемым услугам.
					</p>
					<p>
						3.1.1. Сайт предоставляет Пользователю следующие виды услуг
						(сервисов):
					</p>
					<ul className='list-disc list-inside ml-6'>
						<li>доступ к информации о Сайте</li>
						<li>доступ к средствам навигации Сайта;</li>
						<li>иные виды услуг (сервисов), реализуемые на страницах Сайта.</li>
					</ul>
					<p>
						3.1.2. Под действие настоящего Соглашения подпадают все существующие
						(реально функционирующие) на данный момент услуги (сервисы) Сайта, а
						также любые их последующие модификации и появляющиеся в дальнейшем
						дополнительные услуги (сервисы).
					</p>
					<p>3.2. Доступ к сайту предоставляется на бесплатной основе.</p>
					<p>
						3.3. Настоящее Соглашение является публичной офертой. Получая доступ
						к Сайту, Пользователь считается присоединившимся к настоящему
						Соглашению.
					</p>
					<p>
						3.4. Использование материалов и сервисов Сайта регулируется нормами
						действующего законодательства Российской Федерации.
					</p>

					<h2 className='text-2xl font-semibold'>
						4. ПРАВА И ОБЯЗАННОСТИ СТОРОН
					</h2>
					<p>4.1. Администрация сайта вправе:</p>
					<p>
						4.1.1. Изменять правила пользования Сайтом, а также изменять
						содержание данного Сайта. Изменения вступают в силу с момента
						публикации новой редакции Соглашения на Сайте.
					</p>
					<p>4.2. Пользователь вправе:</p>
					<p>
						4.2.1. Пользоваться всеми имеющимися на Сайте услугами, а также
						приобретать любые Товары и/или Услуги, предлагаемые на Сайте.
					</p>
					<p>4.2.2. Задавать любые вопросы, относящиеся к услугам сайта:</p>
					<ul className='list-disc list-inside ml-6'>
						<li>по телефону: 8 (929) 820-74-74</li>
						<li>
							по электронной почте:{' '}
							<a
								href='mailto:grilmix@yandex.ru'
								className='text-red-500 underline'
							>
								grilmix@yandex.ru
							</a>
						</li>
					</ul>
					<p>
						4.2.3. Пользоваться Сайтом исключительно в целях и порядке,
						предусмотренных Соглашением и не запрещенных законодательством
						Российской Федерации.
					</p>
					<p>
						4.2.4. Копировать информацию с Сайта с разрешения Администрации
						Сайта и указанием ссылки на страницу Сайта.
					</p>
					<p>
						4.2.5. Требовать от администрации скрытия любой информации о
						пользователе.
					</p>
					<p>4.3. Пользователь Сайта обязуется:</p>
					<p>
						4.3.1. Предоставлять по запросу Администрации сайта дополнительную
						информацию, которая имеет непосредственное отношение к
						предоставляемым услугам данного Сайта.
					</p>
					<p>
						4.3.2. Соблюдать имущественные и неимущественные права авторов и
						иных правообладателей при использовании Сайта.
					</p>
					<p>
						4.3.3. Не предпринимать действий, которые могут рассматриваться как
						нарушающие нормальную работу Сайта.
					</p>
					<p>
						4.3.4. Не распространять с использованием Сайта любую
						конфиденциальную и охраняемую законодательством Российской Федерации
						информацию о физических либо юридических лицах.
					</p>
					<p>
						4.3.5. Избегать любых действий, в результате которых может быть
						нарушена конфиденциальность охраняемой законодательством Российской
						Федерации информации.
					</p>
					<p>
						4.3.6. Не использовать Сайт для распространения информации
						рекламного характера, иначе как с согласия Администрации сайта.
					</p>
					<p>4.3.7. Не использовать сервисы с целью:</p>
					<ul className='list-disc list-inside ml-6'>
						<li>
							нарушения прав несовершеннолетних лиц и (или) причинение им вреда
							в любой форме.
						</li>
						<li>ущемления прав меньшинств.</li>
						<li>
							представления себя за другого человека или представителя
							организации и (или) сообщества без достаточных на то прав, в том
							числе за сотрудников данного сайта.
						</li>
						<li>
							введения в заблуждение относительно свойств и характеристик
							какого-либо Товара из каталога Интернет-магазина, размещенного на
							Сайте.
						</li>
						<li>
							некорректного сравнения Товара и/или Услуги, а также формирования
							негативного отношения к лицам, (не) пользующимся определенными
							Товарами и/или услугами, или осуждения таких лиц.
						</li>
					</ul>
					<p>4.3.8. Обеспечить достоверность предоставляемой информации.</p>
					<p>
						4.3.9. Обеспечивать сохранность личных данных от доступа третьих
						лиц.
					</p>
					<p>4.4. Пользователю запрещается:</p>
					<p>
						4.4.1. Использовать любые устройства, программы, процедуры,
						алгоритмы и методы, автоматические устройства или эквивалентные
						ручные процессы для доступа, приобретения, копирования или
						отслеживания содержания Сайта.
					</p>
					<p>4.4.2. Нарушать надлежащее функционирование Сайта.</p>
					<p>
						4.4.3. Любым способом обходить навигационную структуру Сайта для
						получения или попытки получения любой информации, документов или
						материалов любыми средствами, которые специально не представлены
						сервисами данного Сайта.
					</p>
					<p>
						4.4.4. Несанкционированный доступ к функциям Сайта, любым другим
						системам или сетям, относящимся к данному Сайту, а также к любым
						услугам, предлагаемым на Сайте.
					</p>
					<p>
						4.4.5. Нарушать систему безопасности или аутентификации на Сайте или
						в любой сети, относящейся к Сайту.
					</p>
					<p>
						4.4.6. Выполнять обратный поиск, отслеживать или пытаться
						отслеживать любую информацию о любом другом Пользователе Сайта.
					</p>
					<p>
						4.4.7. Использовать Сайт и его Содержание в любых целях, запрещенных
						законодательством Российской Федерации, а также подстрекать к любой
						незаконной деятельности или другой деятельности, нарушающей права
						Сайта или других лиц.
					</p>

					<h2 className='text-2xl font-semibold'>5. ИСПОЛЬЗОВАНИЕ САЙТА</h2>
					<p>
						5.1. Сайт и Содержание, входящее в состав Сайта, принадлежит и
						управляется Администрацией сайта.
					</p>
					<p>
						5.2. Содержание Сайта не может быть скопировано, опубликовано,
						воспроизведено, передано или распространено любым способом, а также
						размещено в глобальной сети «Интернет» без предварительного
						письменного согласия Администрации сайта.
					</p>
					<p>
						5.3. Содержание Сайта защищено авторским правом, законодательством о
						товарных знаках, а также другими правами, связанными с
						интеллектуальной собственностью, и законодательством о
						недобросовестной конкуренции.
					</p>
					<p>
						5.4. Настоящее Соглашение распространяет свое действия на все
						дополнительные положения и условия о покупке Товара и/или оказанию
						услуг, предоставляемых на Сайте.
					</p>
					<p>
						5.5. Информация, размещаемая на Сайте не должна истолковываться как
						изменение настоящего Соглашения.
					</p>
					<p>
						5.6. Администрация сайта имеет право в любое время без уведомления
						Пользователя вносить изменения в перечень Товаров и услуг,
						предлагаемых на Сайте, и (или) их цен.
					</p>

					<h2 className='text-2xl font-semibold'>6. ОТВЕТСТВЕННОСТЬ</h2>
					<p>
						6.1. Любые убытки, которые Пользователь может понести в случае
						умышленного или неосторожного нарушения любого положения настоящего
						Соглашения, а также вследствие несанкционированного доступа к
						коммуникациям другого Пользователя, Администрацией сайта не
						возмещаются.
					</p>
					<p>6.2. Администрация сайта не несет ответственности за:</p>
					<p>
						6.2.1. Задержки или сбои в процессе совершения операции, возникшие
						вследствие непреодолимой силы, а также любого случая неполадок в
						телекоммуникационных, компьютерных, электрических и иных смежных
						системах.
					</p>
					<p>
						6.2.2. Действия систем переводов, банков, платежных систем и за
						задержки связанные с их работой.
					</p>
					<p>
						6.2.3. Надлежащее функционирование Сайта, в случае, если
						Пользователь не имеет необходимых технических средств для его
						использования, а также не несет никаких обязательств по обеспечению
						пользователей такими средствами.
					</p>

					<h2 className='text-2xl font-semibold'>7. Cookies</h2>
					<p>7.1. Дополнительные сведения о файлах cookie.</p>
					<p>
						Компания Индивидуальный предприниматель Даштамиров Сергей Арамович
						стремится к тому, чтобы взаимодействие с нашим веб-сайтом было
						максимально информативным и отвечало вашим интересам. Для этого мы
						используем файлы cookie и подобные средства. Мы считаем, что вам
						важно знать, какие файлы cookie использует наш веб-сайт и для каких
						целей. Это поможет защитить ваши персональные сведения и обеспечит
						максимальное удобство нашего веб-сайта для пользователя.
					</p>
					<p>7.2. Для чего используются эти cookie-файлы?</p>
					<p>
						Файлы cookie представляют собой небольшие текстовые файлы, которые
						сохраняются на вашем компьютере или мобильном устройстве при
						посещении определенных веб-сайтов. Компания Индивидуальный
						предприниматель Даштамиров Сергей Арамович может использовать
						подобные технологии.
					</p>
					<p>7.3. Типы cookie-файлов:</p>
					<ul className='list-disc list-inside ml-6'>
						<li>
							Сеансовые cookie-файлы сохраняются в браузере только на протяжении
							вашего сеанса в браузере, то есть до тех пор, пока вы не покинете
							веб-сайт.
						</li>
						<li>
							Постоянные cookie-файлы сохраняются в вашем браузере после
							завершения сеанса (если вы их не удалили).
						</li>
						<li>
							Cookie-файлы – «сборщики информации» получают информацию о вашем
							использовании веб-сайта, в частности, о том, какие вы посещали
							веб-страницы, о появлении сообщений об ошибках. Эти файлы не
							собирают персонально идентифицируемую информацию. Полученная ими
							информация накапливается таким образом, чтобы обеспечить ее
							анонимность. Cookie-файлы, собирающие информацию, используются для
							совершенствования работы веб-сайта.
						</li>
						<li>
							Функциональные cookie-файлы позволяют веб-сайту запомнить все ваши
							варианты выбора, связанные с данным ресурсом (например, изменение
							размера текста, страницы с пользовательскими настройками).
						</li>
					</ul>
					<p>
						Вы можете найти информацию о том, как отключить файлы cookie или
						изменить настройки файлов cookie для браузера, перейдя по следующим
						ссылкам:
					</p>
					<ul className='list-disc list-inside ml-6'>
						<li>
							<a
								href='https://www.allaboutcookies.org/manage-cookies/'
								className='text-red-500 underline'
							>
								Управление cookie в браузере
							</a>
						</li>
						<li>
							<a
								href='https://support.google.com/accounts/answer/32050'
								className='text-red-500 underline'
							>
								Google Chrome
							</a>
						</li>
						<li>
							<a
								href='https://support.mozilla.org/ru/kb/udalenie-cookie'
								className='text-red-500 underline'
							>
								Mozilla Firefox
							</a>
						</li>
						<li>
							<a
								href='https://support.microsoft.com/ru-ru/help/278835/how-to-delete-cookie-files-in-internet-explorer'
								className='text-red-500 underline'
							>
								Internet Explorer
							</a>
						</li>
						<li>
							<a
								href='https://support.apple.com/ru-ru/HT201265'
								className='text-red-500 underline'
							>
								Safari
							</a>
						</li>
					</ul>
					<p>
						Такие стороны, представляющие социальные сети, могут также собирать
						ваши персональные данные для своих собственных целей. Компания
						Индивидуальный предприниматель Даштамиров Сергей Арамович не
						оказывает влияния на то, как эти стороны, представляющие социальные
						сети, используют ваши персональные данные. Для получения более
						подробной информации о файлах cookie, установленных сторонами,
						представляющими социальные сети, и собираемых ими данных см. их
						политику конфиденциальности и использования файлов cookie.{' '}
					</p>
					<p>7.4. Как отключить файлы cookie?</p>
					<p>
						Вы можете настроить свой браузер на блокировку всех cookie или
						уведомление о их отправке. Однако, если вы отключите cookie, это
						может повлиять на функциональность веб-сайта.
					</p>

					<h2 className='text-2xl font-semibold'>
						8. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ
					</h2>
					<p>
						8.1. Настоящее Соглашение и отношения между Пользователем и
						Администрацией сайта регулируются действующим законодательством
						Российской Федерации.
					</p>
					<p>
						8.2. Все споры, возникающие в связи с настоящим Соглашением,
						подлежат разрешению в соответствии с действующим законодательством
						Российской Федерации.
					</p>
					<p>
						8.3. Если по каким-либо причинам одно или несколько положений
						настоящего Соглашения признаются недействительными или не
						подлежащими применению, остальные положения сохраняют свою силу.
					</p>
					<p>
						8.4. Настоящее Соглашение является публичной офертой и вступает в
						силу с момента его размещения на Сайте.
					</p>
				</div>
			</div>
			<Footer
				shopTag={'foodcourt'}
				reviewLink='https://yandex.ru/maps/org/gril_mikser/5282682587/reviews/?ll=38.884448%2C47.223400&z=17'
			/>
		</div>
	)
}

export default FoodcourtAgreement
